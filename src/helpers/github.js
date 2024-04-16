import { Octokit } from "octokit";
import { GITHUB_API_TOKEN } from './env.js'


export const octokit = new Octokit({ auth: GITHUB_API_TOKEN });
