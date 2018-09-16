#!/bin/bash

# URL of GH Pages
# https://<your_username>.github.io/<repo_name>/
HREF=https://cgund98.github.io/frc-scouting-visualize/

cd $1
ng build --prod --base-href ${HREF} 
npx ngh --dir=dist/frc-scouting-visualize
