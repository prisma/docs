#!/bin/bash

body="This PR probably requires the following redirects to be added to vercel.json:%0A%0A"
no_changed_pages="%0A- This PR does not change any pages in a way that would require a redirect."

echo $GITHUB_BASE_REF
git status -s
git fetch
git reset --soft origin/$GITHUB_BASE_REF
git status -s
status=$(git status -s)

while IFS= read -r line 
do
    # Split line into parts
    IFS=' '
    read -ra values <<< "$line"
    # for value in "${values[@]}"; do
    #     echo "$value"
    # done

    # Skip if line does not indicate modification or rename
    if [[ "${values[0]}" != "D" && "${values[0]}" != "R" ]]; then
        continue
    fi
    
    # Delete msg for no edited pages and start code block
    if [ -n "$no_changed_pages" ]; then
        no_changed_pages=""
        body="$body""\`\`\`%0A"
    fi

    # name pieces (and replace `/index` from files (to get to a filename that would be equivalent))
    action=${values[0]}
    path1=$(echo "${values[1]}" | sed -e 's#/index##g' )
    path2=$(echo "${values[3]}" | sed -e 's#/index##g' )

    # Skip if file names are identical (probably via `/index` replacement above)
    if [[ "$path1" == "$path2" ]]; then
        continue
    fi

    # clean paths
    path1_cleaned=$(echo "$path1" | sed -E 's:content/:/:g' | sed -e 's/.mdx//g' | sed -E 's:/[0-9]+-:/:g' )
    path2_cleaned=$(echo "$path2" | sed -E 's:content/:/:g' | sed -e 's/.mdx//g' | sed -E 's:/[0-9]+-:/:g' )
    
    # special case for deletion
    if [[ "${values[0]}" == "D" ]]; then
        path2_cleaned="/##( TODO: Path of page that replaces deleted page )##"
    fi

    redirect=$(cat <<-END
  {
    "source": "/docs$path1_cleaned",
    "destination": "/docs$path2_cleaned"
  },

END
)
    echo $redirect
    echo ""
    body="$body$redirect%0A"

    #echo "foo" 


done < <(printf '%s\n' "$status")

body="$body$no_changed_pages"
body=$(echo "$body" | sed ':a;N;$!ba;s/\n/%0A/g')
echo $body

echo "::set-output name=body::$body"

