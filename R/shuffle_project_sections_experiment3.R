##' @title Shuffle E3 project sections in JS

##' @param project_sections_experiment3
##'
##' @return
##' @author Shir Dekel
##' @export
shuffle_project_sections_experiment3 <- function(project_sections_experiment3) {

  project_sections_shuffled_experiment3 <-
    project_sections_experiment3 %>%
    toJSON() %>%
      str_c("jsPsych.randomization.shuffle(", ., ").join('. ') + '.'") %>%
    insert_javascript()

  return(project_sections_shuffled_experiment3)

}
