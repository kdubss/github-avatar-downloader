# Project 1 - Github Avatar Downloader

## Goal
In this project you'll build a command-line <code>HTTP</code> client that will request the avatars for all contributers to a given project on GitHub, and download them to disk.

In doing so, you will learn about how to break down larger problems into smaller steps and work incrementally towards your solution. You'll also learn more about topics such as <code>HTTP</code>, <code>APIs</code>, <code>JSON</code>, the <code>file system</code> and how you can work with all of those things through JavaScript and <code>Node</code>.

## Problem Statement
<blockquote>
  Given a GitHub repository name and owner, download all the contributors' profile images and save them to a subdirectory, <code>avatars/</code>.
</blockquote>

## Expected Usage
<p>Your program should be executed from the command line in the following manner,</p>
<code>
  node download_avatars.js jquery jquery
</code>
<br>
<p>Any valid repo-owner + repo combination can be used, such as this:</p>
<code>
  node download_avatars.js nodejs node
</code>