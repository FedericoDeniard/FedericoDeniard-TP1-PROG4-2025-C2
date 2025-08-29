import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Button } from "../../components/button/button";

type GitHubUser = {
  login?: string;
  id?: number;
  node_id?: string;
  avatar_url: string;
  gravatar_id?: string;
  url?: string;
  html_url?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  type?: string;
  user_view_type?: string;
  site_admin?: boolean;
  name: string;
  company?: string | null;
  blog?: string;
  location?: string;
  email?: string | null;
  hireable?: string | null;
  bio: string;
  twitter_username?: string | null;
  public_repos?: number;
  public_gists?: number;
  followers?: number;
  following?: number;
  created_at?: string;
  updated_at?: string;
};

@Component({
  selector: 'app-about',
  imports: [CommonModule, Button],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
@Injectable({ providedIn: 'root' })
export class About {
  private http = inject(HttpClient)
  myself$: Observable<GitHubUser | null> = new Observable<GitHubUser | null>();


  ngOnInit() {
    this.myself$ = this.getMyself("FedericoDeniard")
  }

  getMyself(username: string): Observable<GitHubUser | null> {
    const url = `https://api.github.com/users/${username}`;
    return this.http.get<GitHubUser>(url).pipe(
      catchError((error) => {
        return [{
          avatar_url: "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg",
          name: "User Not Found",
          bio: "This user does not exist or we couldn't find him :c."
        }];
      })
    );
  }
}
