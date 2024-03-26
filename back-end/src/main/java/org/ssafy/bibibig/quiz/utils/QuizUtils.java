package org.ssafy.bibibig.quiz.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.ssafy.bibibig.articles.dto.Article;
import org.ssafy.bibibig.quiz.dto.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
public class QuizUtils {

    private final WordDefine wordDefineRequest;
    private final WiseNerKeywords wiseNerKeywords;

    // 키워드 리스트 받아서 정의 찾기
    public Quiz makeKeywordQuiz(Article article) {
        Word word = findKeyword(article);
        String blurContent = makeBlur(article.content(), word.word);
        String blurSummary = makeBlur(article.summary(), word.word);
        Clue clue = new Clue(ClueType.KEYWORD, word.description);
        return new KeywordQuiz(QuizType.KEYWORD, blurContent, blurSummary, word.word, List.of(clue));
    }

    // 단서 - 본문, 초성힌트
    public Quiz makeKeywordQuiz(Article article, String keyword) {
        String blurContent = makeBlur(article.content(), keyword);
        String blurSummary = makeBlur(article.summary(), keyword);
        Clue clue1 = new Clue(ClueType.ARTICLE, article.content());
        Clue clue2 = new Clue(ClueType.FIRST_LETTER, firstLetter(keyword));
        return new KeywordQuiz(QuizType.KEYWORD, blurContent, blurSummary, keyword, List.of(clue1, clue2));
    }
    public Quiz makeMultipleChoiceQuiz(Article article, String answer, List<String> choices) {
        String blurSummary = makeUnderBar(article.summary(), choices.get(Integer.parseInt(answer)));
        Clue clue1 = new Clue(ClueType.ARTICLE, article.content());
        return new MultipleChoiceQuiz(QuizType.MULTIPLE_CHOICE, blurSummary, answer, List.of(clue1), choices);
    }


    public String firstLetter(String word) {
        String[] CHO = {"ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"};
        StringBuilder sb = new StringBuilder();
        if (word.length() > 0) {
            for (int i = 0; i < word.length(); i++) {
                char chName = word.charAt(i);
                if (chName >= 0xAC00) {
                    int uniVal = chName - 0xAC00;
                    int cho = ((uniVal - (uniVal % 28)) / 28) / 21;

                    sb.append(CHO[cho]);
                }
            }
        }
        return sb.toString();
    }

    private Word findKeyword(Article article) {
        // 자체 키워드 사용 버전
        List<String> keywords = article.keywords().stream().filter(this::determineKeyword).toList();

        // NER 사용 버전
        /*List<String>keywords = Objects.requireNonNull(
                        wiseNerKeywords.findNerWords(article.content()))
                .stream()
                .map(WiseNerKeywords.NameEntity::getText)
                .toList();*/

        // 자체 키워드 + NER 사용 버전
        /*List<String> keywords = article.keywords().stream().filter(this::determineKeyword).toList();
        if (keywords.isEmpty()) {
            keywords = Objects.requireNonNull(
                            wiseNerKeywords.findNerWords(article.content()))
                    .stream()
                    .map(WiseNerKeywords.NameEntity::getText)
                    .toList();
        }*/
        for (String keyword : keywords) {
            try {
                String description = wordDefineRequest.getWordDefine(keyword);
                if (description != null) return new Word(keyword, description);
            } catch (NoSuchElementException e) {
            }
        }
        throw new NoSuchElementException("No suitable keyword");
    }

    // 문제에 키워드 빈칸 처리하기
    private String makeBlur(String content, String keyword) {
        Pattern pattern = Pattern.compile(keyword);
        int keywordLen = keyword.length();
        StringBuilder replacement = new StringBuilder();
        for (int i = 0; i < keywordLen; i++)
            replacement.append("O");

        return pattern.matcher(content).replaceAll(replacement.toString());
    }

    private String makeUnderBar(String content, String keyword) {
        Pattern pattern = Pattern.compile(keyword);

        return pattern.matcher(content).replaceAll("______");
    }

    //TODO: 불용어 있으면 제거하기
    //1. 숫자가 포함되어 있을 경우 숫자 키워드는 제거
    private boolean determineKeyword(String keyword) {
        Pattern pattern = Pattern.compile("\\d");
        return !pattern.matcher(keyword).find();
    }

    private class Word {
        String word;
        String description;

        public Word(String word, String description) {
            this.word = word;
            this.description = description;
        }
    }

}
