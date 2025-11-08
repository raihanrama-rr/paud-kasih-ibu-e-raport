GUIDE: Uploading to GitHub and Deploying to Vercel (quick)
1. Create a new repository on GitHub (paud-kasih-ibu-e-raport).
2. In the repo page click Add file -> Upload files, drag all files from this ZIP (do not include node_modules) and commit.
3. In Vercel: New Project -> Import Git Repository (select your repo).
4. Set environment variables in Vercel (Project Settings -> Environment Variables):
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - (optional) SUPABASE_SERVICE_ROLE_KEY  <- set only in Vercel, do not commit
5. Deploy. After deploy, visit the URL provided by Vercel.