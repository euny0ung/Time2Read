package org.ssafy.bibibig.quiz.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;
import java.util.NoSuchElementException;

@Data
public class WordDefineResponse {

    @JsonProperty("result")
    private int result;

    @JsonProperty("return_object")
    private ReturnObject returnObject;

    @Data
    public static class ReturnObject {
        @JsonProperty("orgQInfo")
        private OrgQInfo orgQInfo;
    }

    @Data
    public static class OrgQInfo {
        @JsonProperty("orgQUnit")
        private OrgQUnit orgQUnit;
    }

    @Data
    public static class OrgQUnit {
        @JsonProperty("vQTopic")
        private List<VQTopic> vQTopics;
    }

    @Data
    public static class VQTopic {
        @JsonProperty("strEntity")
        private String strEntity;

        @JsonProperty("strEntityType")
        private String strEntityType;

        @JsonProperty("dWeightTitle")
        private double dWeightTitle;

        @JsonProperty("vEntityInfo")
        private List<VEntityInfo> vEntityInfos;
    }

    @Data
    public static class VEntityInfo {
        @JsonProperty("strNormEntity")
        private String strNormEntity;

        @JsonProperty("strExplain")
        private String strExplain;

        @JsonProperty("dWeightEn")
        private double dWeightEn;
    }

    public String getTopDefine() {


        return this.getReturnObject().getOrgQInfo().getOrgQUnit().getVQTopics()
                .stream()
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("단어의 정의를 찾을 수 없습니다."))

                .getVEntityInfos()
                .stream()
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("단어의 정의를 찾을 수 없습니다."))

                .getStrExplain();
    }
}
