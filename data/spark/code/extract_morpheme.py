from konlpy.tag import *

from summarizer import KeywordSummarizer, KeysentenceSummarizer

def get_hannanum_pos(sentences):
    sentences_pos_list = []
    hannanum = Hannanum()
    for sentence in sentences:
        tagged_words = [(word, tag) for word, tag in hannanum.pos(sentence) if len(word) > 1]
        if tagged_words:
            sentences_pos_list.append([f'{word}/{tag}' for word, tag in tagged_words])
    return sentences_pos_list

def get_hannanum_noun(sentences):
    hannanum = Hannanum()
    return hannanum.nouns(" ".join(sentences))

def get_komoran_pos(sentences):
    sentences_pos_list = []
    komoran = Komoran()
    for sentence in sentences:
        sentences_pos_list.append([f'{word}/{tag}' for word, tag in komoran.pos(sentence)])
    return sentences_pos_list

def get_hannanum_noun(sentences):
    komoran = Komoran()
    return komoran.nouns(" ".join(sentences))

def komoran_tokenize(sent):
    words = [w for w in sent if ('/NN' in w or '/XR' in w or '/VA' in w or '/VV' in w)]
    return words
def hannanum_tokenize(sent):
    words = [w for w in sent if ('/N' in w or '/V' in w or '/A' in w or '/X' in w)]
    return words


keyword_extractor = KeywordSummarizer(
        tokenize=hannanum_tokenize,  # 품사 정보를 포함한 str 형식 리스트
        min_count=2,
        window=-1,
        df=0.85,
        verbose=False
    )
summarizer = KeysentenceSummarizer(
        tokenize=lambda x: x.split(),
        min_sim=0.3,
        verbose=False
    )

def summarize_sentences(sentences):
    # bias = np.ones(len(sentences))
    # bias[-2] = 10
    keysents = summarizer.summarize(sentences, topk=3, bias=None)
    result = [sentence[2] for sentence in keysents]
    return " ".join(result)

def extract_noun_keywords_by_komoran(sent):
    words = [w for w, rank in sent if ('/NN' in w)]
    result = [word.split('/')[0] for word in words]
    return result[:5]

def extract_noun_keywords_by_hannanum(sent):
    print(sent)
    print(type(sent))

    words = [w for w, rank in sent if ('/N' in w)]
    result = [word.split('/')[0] for word in words]
    return result[:5]