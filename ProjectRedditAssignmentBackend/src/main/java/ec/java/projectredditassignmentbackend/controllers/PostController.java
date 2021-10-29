package ec.java.projectredditassignmentbackend.controllers;

import ec.java.projectredditassignmentbackend.model.PostEntity;
import ec.java.projectredditassignmentbackend.model.UserEntity;
import ec.java.projectredditassignmentbackend.service.PostService;
import ec.java.projectredditassignmentbackend.service.UserService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Collection;

@RestController
@RequestMapping("/post")
public class PostController {

    private final PostService postService;
    private final UserService userService;

    public PostController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    @PostMapping("/create-post")
    public PostEntity createPost(@RequestHeader("token") String token, @RequestBody PostEntity post, HttpServletResponse response){
        UserEntity user = userService.validate(token);
        if (post == null || user == null){
            response.setStatus(401);
           return null;
        } else {
            response.setStatus(201);
            System.out.println("post: " + post.getTitle() + " | " + post.getContent() + " | " + post.getPoints());

            return postService.createPost(post, user);
        }
    }

    @GetMapping("/get-all-posts")
    public Collection<PostEntity> getAllProducts(@RequestHeader("token") String token, HttpServletResponse response){
        if (userService.validate(token) == null){
            response.setStatus(401);
            return null;
        }else {
            return postService.getAllPosts();
        }
    }
}
