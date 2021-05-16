##' @title Get long projects distribution absent trial
##' @param projects_experiment4
##'
##' @param randomize_order
##'
##'
##' Each participant will see 20 project made up of the 10 domains, with two variations each. The two variations will be chosen at random, such that there will be 10 sets of pair variations.
##'
##' @return
##' @author Shir Dekel
##' @export
get_trials_experiment4 <- function(projects_experiment4, randomize_order) {

  # For within-industry variation
  project_variation <-
    1:length(projects_experiment4$description) %>%
    as.numeric()

  trials_experiment4 <-
    c("naive", "aware") %>%
    map(
      function(awareness)
        list(projects_experiment4 %>%
               transpose(),
             project_variation) %>%
        pmap(
          function(timeline_variable_variation, project_variation_value)
            get_trial_separate_experiment4(
              timeline_variable = timeline_variable_variation,
              awareness = awareness,
              project_variation_value = project_variation_value,
              randomize_order = randomize_order
            )
        )
    )

  return(trials_experiment4)

}
