package ec.java.projectredditassignmentbackend.service;

import ec.java.projectredditassignmentbackend.model.UserEntity;
import ec.java.projectredditassignmentbackend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final Map<String, UserEntity> loginTokens = new HashMap<>();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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

}
