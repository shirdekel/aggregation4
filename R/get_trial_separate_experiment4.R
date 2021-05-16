##' @title Get separate condition timeline for E4

##' @param preamble
##'
##' @param project_description
##' @param form_options
##' @param project_input
##'
##' @return
##' @author Shir Dekel
##' @export
get_trial_separate_experiment4 <- function(preamble, timeline_variable, form_options = c("Yes", "No"), awareness, project_variation_value, randomize_order = randomize_order) {

  preamble <-
    p(
      "Indicate below whether you would invest in the project:"
    )

  if (awareness == "naive") {
    preamble_awareness <-
      div(
        p(
          "Below is a description of the current project."
        ),
        preamble
      ) %>%
      as.character()
  } else if (awareness == "aware") {
    preamble_awareness <-
      div(
        p(
          "Below is a description of project ' +
        jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0] +
        ' of 20.",
          .noWS = "after"
        ),
        preamble,
        .noWS = "inside"
      ) %>%
      as.character() %>%
      str_c(
        "function() {
        preamble_awareness = '", .,"'
        return preamble_awareness
        }"
      ) %>%
      insert_javascript()
  }

  trial_separate_main <- trial_survey_multi_choice(
    preamble = preamble_awareness,
    questions = question_multi(
      prompt = insert_variable("prompt"),
      options = form_options,
      name = insert_variable("name"),
      required = TRUE
    ),
    data = insert_property(stage = "project_choice"),
    on_finish = insert_javascript(
      "function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        }"
    )
  )

  trial_separate_experiment4 <-
    build_timeline(trial_separate_main) %>%
    set_variables(prompt = timeline_variable$description,
                  name = timeline_variable$input) %>%
    set_parameters(randomize_order = randomize_order) %>%
    build_timeline() %>%
    display_if(fn_data_condition(awareness == !!awareness)) %>%
    build_timeline() %>%
    display_if(fn_data_condition(project_variation == !!project_variation_value))

  return(trial_separate_experiment4)

}
