package ec.java.projectredditassignmentbackend.repository;

import ec.java.projectredditassignmentbackend.model.PostEntity;
import ec.java.projectredditassignmentbackend.model.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class UserRepository {

    private final Map<String, UserEntity> users = new HashMap<>();

    public boolean createUser(UserEntity user){
        if (users.containsKey(user.getUsername().toLowerCase())){
            return false;
        } else {
            users.put(user.getUsername().toLowerCase(), user);
            return true;
        }
    }

    public UserEntity getUser(String username){
        return users.get(username.toLowerCase());
    }

    public void removePost(String username, PostEntity title){
       UserEntity user = getUser(username);

       user.getPosts().remove(title);
    }
}
