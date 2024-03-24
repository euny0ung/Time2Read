package org.ssafy.bibibig.member.api;

import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class MyControllerTest {


    @Autowired
    private MockMvc mockMvc;

    @Test
    void getScrapedArticle() throws Exception {
        // given
        String id = "10648964-7421-4ac9-b874-400a05021562";

        MockHttpServletRequestBuilder request = MockMvcRequestBuilders
                .get(String.format("/v1/my/scraped-article/%s", id))
                .contentType(MediaType.APPLICATION_JSON);

        // when
        ResultActions perform = mockMvc.perform(request);

        // then
        perform.andExpect(status().isOk())
                .andExpect(jsonPath("$.result.mainCategory").value("경제"))
                .andExpect(jsonPath("$.result.id").value(id));
    }
}