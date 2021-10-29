package ec.java.projectredditassignmentbackend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentEntity {

    private String comment;
    private PostEntity post;
    private UserEntity user;
}
