package org.ssafy.bibibig.articles.application;

import org.elasticsearch.index.query.MoreLikeThisQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.functionscore.ScoreFunctionBuilders;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.bucket.terms.ParsedStringTerms;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.*;
import org.springframework.web.client.RestTemplate;
import org.ssafy.bibibig.articles.dao.ArticleRepositoryCustom;
import org.ssafy.bibibig.articles.domain.ArticleEntity;
import org.ssafy.bibibig.articles.dto.CategoryType;
import org.ssafy.bibibig.articles.dto.KeywordTerms;
import org.ssafy.bibibig.quiz.fixture.ArticleEntityFixture;
import org.ssafy.bibibig.quiz.utils.WordDefine;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.regex.Pattern;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.moreLikeThisQuery;
import static org.junit.jupiter.api.Assertions.assertAll;

@SpringBootTest
class ArticleServiceTest {

    @Autowired
    ElasticsearchOperations operations;
    @Autowired
    ArticleRepositoryCustom articleRepository;
    @Autowired
    WordDefine wordDefine;
    @Autowired
    RestTemplate restTemplate;

    //TODO : mocking을 활용하여 조회테스트 코드 작성해볼 것
    //ES에서 데이터 조회 테스트
    @Test
    @DisplayName("id로 데이터 조회하기")
    void searchById() throws IOException {
        //given
        String id = "0d5df75c-b08e-4c9d-93b7-9adc5946f64f";

        Criteria criteria = Criteria.where("id").is(id);
        Query query = new CriteriaQuery(criteria);
        SearchHit<ArticleEntity> search = operations.search(query, ArticleEntity.class).getSearchHit(0);
        ArticleEntity article = search.getContent();

        assertThat(id).isEqualTo(article.getId());
    }

    @RepeatedTest(5)
    @DisplayName("년도와 카테고리로 대표 키워드 불러오기")
    void givenYearAndCategory_whenSearchKewordsByYearAndCategory_thenReturnKeywordsList() {
        //given
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        int year = 2023;
        CategoryType category = CategoryType.SOCIETY;

        //when
        NativeSearchQuery query = new NativeSearchQueryBuilder()
                .withQuery(QueryBuilders.boolQuery()
                        .must(QueryBuilders.matchQuery("대분류", category.getName()))
                        .must(QueryBuilders.rangeQuery("작성시간")
                                .gte(LocalDateTime.of(year, 1, 1, 0, 0).format(formatter))
                                .lte(LocalDateTime.of(year + 1, 1, 1, 0, 0).format(formatter))
                        )
                ).withMaxResults(0)
                .addAggregation(AggregationBuilders.terms("keyword_terms").field("키워드").size(50))
                .build();

        SearchHits<?> searchHits = operations.search(query, ArticleEntity.class);
        ParsedStringTerms pst = Objects.requireNonNull(searchHits.getAggregations()).get("keyword_terms");

        //then
        List<KeywordTerms> result = pst.getBuckets().stream().map(s ->
                new KeywordTerms(s.getKey().toString(), s.getDocCount())
        ).toList();
        System.out.println(result);
        assertThat(result.size()).isEqualTo(50);
    }

    @RepeatedTest(5)
    @DisplayName("년도, 키워드 그리고 분류를 통해 랜덤 기사 뽑기")
    void givenKeywordAndCategory_whenSelectRandomArticle_thenReturnArticle() {
        //given
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        int year = 2023;
        CategoryType category = CategoryType.ECONOMY;
        String keyword = "인공지능";

        //when
        NativeSearchQuery query = new NativeSearchQueryBuilder()
                .withQuery(QueryBuilders.functionScoreQuery(
                        QueryBuilders.boolQuery()
                                .must(QueryBuilders.matchQuery("대분류", category.getName()))
                                .must(QueryBuilders.matchQuery("키워드", keyword))
                                .must(QueryBuilders.rangeQuery("작성시간")
                                        .gte(LocalDateTime.of(year, 1, 1, 0, 0).format(formatter))
                                        .lte(LocalDateTime.of(year + 1, 1, 1, 0, 0).format(formatter))
                                ),
                        ScoreFunctionBuilders.randomFunction())
                ).withMaxResults(1)
                .build();
        SearchHit<ArticleEntity> search = operations.search(query, ArticleEntity.class).getSearchHit(0);
        ArticleEntity article = search.getContent();
        assertAll(
                () -> assertThat(year).isEqualTo(article.getWroteAt().getYear()),
                () -> assertThat(category.getName()).isEqualTo(article.getMainCategory()),
                () -> assertThat(keyword).isIn(article.getKeywords())
        );
    }

    //TODO : 외부 API키를 활용하기 위한 방법 찾기 - 테스트 시에는 WordDefine의 키 값이 제대로 들어가지 않는다.
    /*@Test
    @DisplayName("ES에서 기사 조회 -> 퀴즈 반환")
    void givenArticleEntity_whenMakeQuiz_thenReturnArticleWithQuiz() {
        //given
        ArticleEntity fixture = fixture();
        QuizUtils quizUtils = new QuizUtils(wordDefine);
        //when
        Quiz quiz = quizUtils.makeQuiz(Article.from(fixture));
        //then
        System.out.println(quiz);
        assertAll(
                () -> assertThat(quiz.quizType()).isEqualTo(QuizType.KEYWORD),
                () -> assertThat(quiz.answer()).isEqualTo("부작용"),
                () -> assertThat(quiz.clue().word()).isEqualTo("부작용"),
                () -> assertThat(quiz.questionContent()).isEqualTo(makeBlur(fixture.getContent(), "부작용")),
                () -> assertThat(quiz.questionSummary()).isEqualTo(makeBlur(fixture.getSummary(), "부작용"))
        );
    }*/

    private String makeBlur(String content, String keyword) {
        Pattern pattern = Pattern.compile(keyword);
        int keywordLen = keyword.length();
        StringBuilder replacement = new StringBuilder();
        for (int i = 0; i < keywordLen; i++)
            replacement.append("O");

        return pattern.matcher(content).replaceAll(replacement.toString());
    }

    @RepeatedTest(1)
    @DisplayName("카테고리 랜덤 생성")
    void randomCategory() {
        List<CategoryType> categoryList = new ArrayList<>(List.of(CategoryType.values()));
        Random random = new Random();
        for (int i = 0; i < 4; i++) {
            int randomIdx = random.nextInt(CategoryType.values().length);
            categoryList.add(CategoryType.values()[randomIdx]);
        }
        assertThat(categoryList.size()).isEqualTo(10);
        System.out.println(categoryList);
    }

    @Test
    @DisplayName("분류 카테고리에서 특정 카테고리 개수 세기")
    void givenCategory_whenCategoryCount_thenReturnSize() {
        //given
        List<CategoryType> categoryList = List.of(CategoryType.ECONOMY, CategoryType.ECONOMY, CategoryType.CULTURE, CategoryType.POLITICS, CategoryType.ECONOMY);
        List<CategoryType> categories= List.of(CategoryType.values());
        assertAll(
                () -> assertThat(Collections.frequency(categoryList, CategoryType.ECONOMY)).isEqualTo(3),
                () -> assertThat(Collections.frequency(categoryList, CategoryType.CULTURE)).isEqualTo(1),
                () -> assertThat(Collections.frequency(categoryList, CategoryType.POLITICS)).isEqualTo(1),
                () -> assertThat(Collections.frequency(categoryList, CategoryType.INTERNATIONAL)).isEqualTo(0)
        );
        for(CategoryType category : categories) {
            int size = Collections.frequency(categoryList, category);
        }
    }

    @Test
    @DisplayName("관련된 기사 top 5- more like this")
    void givenIdAndContent_whenSearchRelationalArticles_thenReturnArticleLists() {
        //given
        String index = "hani-news-topic-index";
        String id = "c33049bb-e879-470e-8e77-7654bf4d3a53";

        //when
        MoreLikeThisQueryBuilder.Item[] likeItems = {
                new MoreLikeThisQueryBuilder.Item(index, id)
        };
        NativeSearchQuery query = new NativeSearchQueryBuilder()
                .withQuery(
                        moreLikeThisQuery(likeItems)
                                .minTermFreq(1)
                                .maxQueryTerms(12)
                )
                .build();
        //then
        SearchHits<?> searchHits = operations.search(query, ArticleEntity.class);
        List<ArticleEntity> result = searchHits.getSearchHits().stream()
                .limit(5)
                .map(SearchHit::getContent)
                .filter(ArticleEntity.class::isInstance)
                .map(ArticleEntity.class::cast)
                .toList();
        assertThat(result.size()).isEqualTo(5);
        System.out.println(result);
    }

    private ArticleEntity fixture() {
        String id = "2f630765-7955-46d2-97f6-b849086d609b";
        String content = "안경 사람들에게 추운 겨울은 그야말로 고역이다. 따뜻한 곳에만 들어가면 안경에 끼는 서리 난감한 상황에 노출되기 때문이다. 이렇게 불편한 안경 대신 렌즈를 착용하기도 눈이 건조한 사람들에게 렌즈는 안구건조증을 초래하기도 한다. 특단의 조치로 많은 사람들이 라식수술과 같은 시력교정수술을 결심한다. 안경과 렌즈의 보완책으로 여겨지는 시력교정수술이 보편화된 수술로 자리 잡았다고 해도, 부작용의 위험이 사라진 것을 의미하는 것은 아니다. 실제로 라식소비자단체(아이프리)가 밝힌 지난해 라식수술 부작용 사례건수는 13건에 달했다. 접수된 부작용을 살펴보면 시야의 결손이 생기는 망막박리(1건)와 각막혼탁(1건), 수술 장비멈춤(2건) 중심이탈(1건), 각막편 손상(2건), 세균감염(1건), 각막이 원뿔형으로 볼록하게 돌출하는 원추각막증(5건) 등이다. 소비자단체에 신고되지 않은 사례를 포함한다면 부작용 사례는 더욱 많을 것으로 추정된다. 이에 라식소비자단체에서는 부작용에 대한 경계를 강조하고 있다. 라식수술로 발생하는 라식부작용 중에는 돌이키기 힘든 것들도 있다. 이는 사전에 노력하면 소비자가 충분히 예방할 있는 것들이다. 좀더 꼼꼼히 따져보고 선택에 있어 주의를 기하는 태도가 필요하다. 이와 단체 관계자는 라식부작용에 대해 걱정하는 사람들에게 라식보증서 발급제도를 적극 활용하라고 조언한다. 라식보증서란 라식수술로 인해 발생할지 모를 부작용으로부터 소비자를 보호하기 위해 고안된 약속장치다. 라식보증서를 발급받은 라식 소비자는 수술 이후 불편한 증상이 발생했을 아이프리의 안전관리 제도를 통해 치료를 위한 시술병원의 관리를 받을 있으며, 기간동안 증상이 호전되지 않고 부작용으로 발전된다면 의료진으로부터 최대 3억원의 배상을 받을 있다. 라식소비자단체는 검사장비와 수술장비의 상태, 수술실 미세먼지 세균 수치를 꼼꼼히 체크하는 정기점검과 라식부작용 예방 토론회, 라식바로알기캠페인 등을 꾸준히 진행하고 있다. 이는 라식수술이 이루어지기 미리 부작용을 예방하기 위한 활동들로 소비자들이 챙기기 힘든 부분을 단체에서 보완하려 노력하고 있다고 한다. 이외 소비자들의 수술 병원에 대한 만족도를 나타내는 수치인 소비자만족릴레이를 통해 병원 측에 경각심을 일깨우고 수술 이후에도 책임감 있는 사후관리를 이끌어 냄으로써 안전한 라식문화 형성에 기여하고 있다. 라식보증서 무료 발급 라식소비자단체에 대한 더욱 자세한 설명은 홈페이지(www.eyefree.co.kr)에서 확인할 있다.* 자료 제공 라식소비자단체 아이프리본 기사는 한겨레 의견과 다를 있으며, 기업이 제공한 정보기사입니다.";
        String summary = "이외 소비자들의 수술 병원에 대한 만족도를 나타내는 수치인 소비자만족릴레이를 통해 병원 측에 경각심을 일깨우고 수술 이후에도 책임감 있는 사후관리를 이끌어 냄으로써 안전한 라식문화 형성에 기여하고 있다. 이에 라식소비자단체에서는 부작용에 대한 경계를 강조하고 있다. 라식보증서 무료 발급 라식소비자단체에 대한 더욱 자세한 설명은 홈페이지(www.eyefree.co.kr)에서 확인할 있다.*";
        List<String> keywords = List.of("부작용", "수술", "소비자", "증상", "이");
        return ArticleEntityFixture.get(id, content, summary, keywords);
    }

}