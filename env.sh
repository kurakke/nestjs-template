project_name='nestjs-template'

alias docker-compose="docker-compose -p $project_name"
alias build="docker-compose -p $project_name build"
alias up="docker-compose -p $project_name up"
alias stop="docker-compose -p $project_name stop"
alias down="docker-compose -p $project_name down"
alias app="docker-compose -p $project_name up app"
alias db="docker-compose -p $project_name up db"
alias db-test="docker-compose -p $project_name up db-test"
alias db-reset="npx prisma migrate reset"
alias studio="docker-compose -p $project_name up studio"
alias migrate="docker exec -it $project_name-app-1 npx prisma migrate dev"
alias generate="docker exec -it $project_name-app-1 npx prisma generate"
alias seed="docker exec -it $project_name-app-1 npm run seed"
alias test="docker exec -it $project_name-app-1 npm run test"
alias test-e2e="docker exec -it $project_name-app-1 npm run test:e2e"
alias on-app="docker exec -it $project_name-app-1"

npm() {
  docker exec -it $project_name-app-1 npm $*
}

npx() {
  docker exec -it $project_name-app-1 npx $*
}

if [ -n "$ZSH_VERSION" ]; then
 autoload -Uz colors
 colors
 RPROMPT="[%{${fg_bold[cyan]}%}$project_name%{${reset_color}%}]"
elif [ -n "$BASH_VERSION" ]; then
 prefix="(\[\e[36m\]$project_name\[\e[0m\])"
 PS1="$prefix $PS1"
fi
