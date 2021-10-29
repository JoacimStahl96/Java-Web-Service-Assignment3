package ec.java.projectredditassignmentbackend.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UserEntity {

    private String username, password;
    private List<PostEntity> posts;

    public UserEntity(String username, String password) {
        this.username = username;
        this.password = password;
        this.posts = new ArrayList<>();
    }
}
