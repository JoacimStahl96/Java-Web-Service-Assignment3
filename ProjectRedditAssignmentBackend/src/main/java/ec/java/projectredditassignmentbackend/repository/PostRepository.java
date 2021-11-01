package ec.java.projectredditassignmentbackend.repository;

import ec.java.projectredditassignmentbackend.model.PostEntity;
import ec.java.projectredditassignmentbackend.model.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Repository
public class PostRepository {

    private final Map<String, PostEntity> posts = new HashMap<>();

    public PostEntity createPost(PostEntity post, UserEntity user){
        user.getPosts().add(post);
        return posts.put(post.getTitle().toLowerCase(), post);
    }

    public PostEntity getSpecificPost(String post){
      PostEntity entity = posts.get(post.toLowerCase());
        if (entity != null){
            return posts.get(post);
        } else {
            return null;
        }
    }

    public Collection<PostEntity> getAllPosts(){
        return posts.values();
    }

    public void removePost(String title){
        posts.remove(title);
    }
}
