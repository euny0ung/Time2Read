import os
import json
import urllib3
import sys
from dotenv import load_dotenv

class Morpheme:
    def __init__(self, text, type, count):
        self.text = text
        self.type = type
        self.count = count


class NameEntity:
    def __init__(self, text, type, count):
        self.text = text
        self.type = type
        self.count = count

load_dotenv()
def find_keywords(text):
    open_api_url = "http://aiopen.etri.re.kr:8000/WiseNLU"
    access_key = os.environ.get('NER_KEY')
    analysis_code = "ner"

    requestJson = {
        "argument": {
            "text": text,
            "analysis_code": analysis_code
        }
    }

    http = urllib3.PoolManager()
    headers = {"Content-Type": "application/json; charset=UTF-8"}

    response = http.request(
        "POST",
        open_api_url,
        headers={"Content-Type": "application/json; charset=UTF-8", "Authorization": access_key},
        body=json.dumps(requestJson)
    )

    response_body = json.loads(response.data)
    if response.status != 200:
        print(f"[error] {response.status_code}: {response_body}")
        sys.exit(1)

    #if result != 0:
    #    print(f"[error] {result}: {response_body['result']}")
    #    sys.exit(1)
    return_object = response_body["return_object"]
    sentences = return_object["sentence"]

    morphemes_map = {}
    name_entities_map = {}

    for sentence in sentences:
        morphological_analysis_result = sentence["morp"]
        for morpheme_info in morphological_analysis_result:
            lemma = morpheme_info["lemma"]
            morpheme = morphemes_map.get(lemma)
            if morpheme is None:
                morpheme = Morpheme(lemma, morpheme_info["type"], 1)
                morphemes_map[lemma] = morpheme
            else:
                morpheme.count += 1

        name_entity_recognition_result = sentence["NE"]
        for name_entity_info in name_entity_recognition_result:
            name = name_entity_info["text"]
            name_entity = name_entities_map.get(name)
            if name_entity is None:
                name_entity = NameEntity(name, name_entity_info["type"], 1)
                name_entities_map[name] = name_entity
            else:
                name_entity.count += 1

    morphemes = list(morphemes_map.values())
# print(morphemes_map)
# for morpheme in morphemes:
# print(morpheme.text)
    morphemes.sort(key=lambda x: x.count, reverse=True)

    name_entities = list(name_entities_map.values())
    name_entities.sort(key=lambda x: x.count, reverse=True)

    print("Top 5 Nouns:")
    count = 0
    for morpheme in morphemes:
        if morpheme.type in ["NNG", "NNP", "NNB"]:
            print(f"[명사] {morpheme.text} ({morpheme.count})")
            count += 1
        if count > 5:
            break

    print("\nTop 5 Verbs:")
    count = 0
    for morpheme in morphemes:
        if morpheme.type == "VV":
            print(f"[동사] {morpheme.text} ({morpheme.count})")
            count += 1
        if count > 5:
            break

    print("\nTop 5 Named Entities:")
    for name_entity in name_entities[:5]:
        print(f"[개체명] {name_entity.text} ({name_entity.count})")