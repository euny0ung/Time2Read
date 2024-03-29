package org.ssafy.bibibig.quiz.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Getter
@Setter
public class OXQuestion {
    private String question;
    private boolean answer;

}
