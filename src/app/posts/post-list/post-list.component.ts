import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  postServiceSubscription: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postServiceSubscription = this.postsService
      .getPostUpdateListener()
      .subscribe((data: Post[]) => {
        this.isLoading = false;
        this.postsArray = data;
      });
  }

  ngOnDestroy() {
    this.postServiceSubscription.unsubscribe();
  }

  onDelete(id: string) {
    this.postsService.deletePost(id);
  }
}
