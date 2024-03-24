package org.ssafy.bibibig.result.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ResultControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("연관된 기사 조회")
    public void relatedTest() throws Exception {
        // given
        List<String> id = List.of(
                "10648964-7421-4ac9-b874-400a05021562",
                "871b5fa9-daed-44d2-a89e-acb1442bcfc0"
        );
        JSONArray jsonArray = new JSONArray(id);
        JSONObject body = new JSONObject();
        body.put("id", jsonArray);

        MockHttpServletRequestBuilder request = MockMvcRequestBuilders
                .post("/v1/result/related")
                .content(body.toString())
                .contentType(MediaType.APPLICATION_JSON);

        // when
        ResultActions perform = mockMvc.perform(request);

        // then
        perform.andExpect(status().isOk());

        String response = perform.andReturn().getResponse().getContentAsString();
        Map<String, List<Object>> map = new ObjectMapper().readValue(response, Map.class);

        assertTrue(map.get("result").size() > 0);
    }
}