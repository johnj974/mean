import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  //.
  isLoading = false;
  postsArray: Post[] = [];
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  displayOptions = [1, 2, 5, 10];
  isUserAuthenticated = false;
  userId: string;
  postServiceSubscription: Subscription;
  authorisationSubscription: Subscription;

  constructor(
    private postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postServiceSubscription = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.postsArray = postData.posts;
        this.totalPosts = postData.postCount;
      });
    this.isUserAuthenticated = this.authService.getIsAuthenticated();
    this.authorisationSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthorised) => {
        console.log(isAuthorised);
        this.isUserAuthenticated = isAuthorised;
        this.userId = this.authService.getUserId();
      });
  }

  ngOnDestroy() {
    this.postServiceSubscription.unsubscribe();
    this.authorisationSubscription.unsubscribe();
  }

  onDelete(id: string) {
    this.isLoading = true;
    this.postsService.deletePost(id).subscribe(
      () => {
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
}
