package ec.java.projectredditassignmentbackend.service;

import ec.java.projectredditassignmentbackend.model.PostEntity;
import ec.java.projectredditassignmentbackend.model.UserEntity;
import ec.java.projectredditassignmentbackend.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public PostEntity createPost(PostEntity post, UserEntity user){
        if (postRepository.createPost(post) != null){
            user.getPosts().add(post);
            return new PostEntity(post.getTitle(), post.getContent(), post.getPoints());
        } else {
            return null;
        }
    }

    public Collection<PostEntity> getAllPosts(){
        return postRepository.getAllPosts();
    }

    public boolean deletePost(PostEntity post){
        String title = post.getTitle().toLowerCase();
        PostEntity entity = postRepository.getSpecificPost(post);
        if (title.equals(entity.getTitle())){
            postRepository.removePost(title);
            return true;
        } else {
            return false;
        }

    }
}
