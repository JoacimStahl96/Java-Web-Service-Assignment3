package ec.java.projectredditassignmentbackend.service;

import ec.java.projectredditassignmentbackend.model.PostEntity;
import ec.java.projectredditassignmentbackend.model.UserEntity;
import ec.java.projectredditassignmentbackend.repository.PostRepository;
import ec.java.projectredditassignmentbackend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    private final Map<String, UserEntity> loginTokens = new HashMap<>();

    public UserService(UserRepository userRepository, PostRepository postRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    public boolean createUser(UserEntity user){
        return userRepository.createUser(user);
    }

    public String LoginUser(String username, String password){
       UserEntity user = userRepository.getUser(username);
       if (user == null){
           return null;
       }
       if (!user.getPassword().equals(password)){
           return null;
       }
       String token = UUID.randomUUID().toString();
       loginTokens.put(token, user);
       return token;
    }

    public void logoutUser(String token){
        loginTokens.remove(token);
    }

    public UserEntity validate(String token){
        return loginTokens.get(token);
    }

    public boolean removePost(String username, String title){
        if (username == null || title == null ){
            return false;
        }
        PostEntity post = postRepository.getSpecificPost(title);
        userRepository.removePost(username, post);
        return true;
    }

}
