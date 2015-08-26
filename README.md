# GitHub PR Ignore

![tile](title_440x280.png)

Chrome-extension which hides uninterested files (e.g. auto-generated) when you review GitHub PR.

It has the following features:

* You can toggle show/hide file's diff in PR.
* If you put a config file, it automatically hides matched files.

[Install here](https://chrome.google.com/webstore/detail/github-pr-ignore/gpcifcdmiplinlnenjfnbpmomkdehogc)


## Config file

If you put `.prignore` at root of your repository, this extension automatically hides matched files.
`.prignore` should be written in the same pattern format `.gitignore` file.
For example:

```
# ignore generated CSS files
dist/*.css
```

