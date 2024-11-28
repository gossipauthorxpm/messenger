package depends.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;
import lombok.extern.jackson.Jacksonized;

@Data
@With
@RequiredArgsConstructor
@AllArgsConstructor
public class LogMessage {

    protected TypeLog level;
    protected String message;
    protected TypeSender sender;
}
