##' @title Project expectation follow up question

##' @return
##' @author Shir Dekel
##' @export
get_trial_project_expectation <- function() {

  trial_project_expectation_html <- get_survey_number(
    label_text = "At the begining of the experiment, before you saw any projects, how many projects did you expect to see?",
    name = "project_expectation",
    max = 100,
    suffix = "project(s)") %>%
    as.character()

  trial_project_expectation <- trial_generic(
    "survey-html-form",
    html = trial_project_expectation_html,
    data = insert_property(stage = "project_expectation")
  )

  return(trial_project_expectation)

}
