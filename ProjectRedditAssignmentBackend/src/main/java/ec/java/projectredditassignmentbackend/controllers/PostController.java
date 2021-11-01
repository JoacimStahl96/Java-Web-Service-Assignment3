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
    public PostEntity createPost(@RequestHeader("token") String token, @RequestBody PostEntity post, HttpServletResponse response) {
        UserEntity user = userService.validate(token);
        if (post == null || user == null) {
            response.setStatus(401);
            return null;
        } else {
            response.setStatus(201);
            return postService.createPost(post, user);
        }
    }

    @GetMapping("/get-all-posts")
    public Collection<PostEntity> getAllPosts(HttpServletResponse response) {
            return postService.getAllPosts();
    }

    @GetMapping(path = "/get-users-posts")
    public Collection<PostEntity> getUsersOwnPosts(@RequestHeader("token") String token, HttpServletResponse response) {
        UserEntity user = userService.validate(token);
        if (user == null) {
            response.setStatus(401);
            return null;
        }
        return user.getPosts();
    }

    @DeleteMapping(path = "/delete-post/{username}/{post}")
    public void deletePost(@RequestHeader("token") String token, @PathVariable String username, @PathVariable String post, HttpServletResponse response) {
        if (userService.validate(token) == null || post == null || username == null) {
            response.setStatus(401);
        }
        assert post != null;
        if (userService.removePost(username, post)) {
            response.setStatus(200);
        }
        if (postService.deletePost(post)) {
            response.setStatus(200);
        }
    }
}
