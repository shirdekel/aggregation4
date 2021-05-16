##' @title Get long projects
##'
##' @param gambles
##'
##' @return
##' @author Shir Dekel
##' @export
get_projects_experiment4 <- function(gambles) {

  project_detail_components_experiment3 <-
    get_project_detail_components_experiment3()

  project_detail_experiment3 <-
    get_project_detail_experiment3(project_detail_components_experiment3)

  project_detail_components_input_experiment3 <-
    get_project_detail_components_input_experiment3(
      project_detail_components_experiment3
    )

  project_pair_sample <-
    list(
      project_detail_experiment3,
      project_detail_components_input_experiment3
    ) %>%
    set_names("description", "input") %>%
    map(~ .x %>%
          transpose() %>%
          map(unlist)) %>%
    transpose() %>%
    map(transpose) %>%
    get_project_pair_sample() %>%
    map(transpose)

  project_components_experiment3 <-
    get_project_components_experiment3()

  project_description_experiment4 <-
    project_pair_sample %>%
    map(
      ~ get_project_description_experiment3(
        gambles,
        project_components_experiment3 %>%
          map(~.x %>%
                rep(2)),
        .x$description
      )
    )

  project_input_experiment4 <-
    project_pair_sample %>%
    map(
      ~ shirthesis::get_project_input(
        type = project_components_experiment3$type %>%
          rep(2),
        detail = .x$input,
        gambles
      )
    )

  projects_experiment4 <-
    list(
      description = project_description_experiment4,
      input = project_input_experiment4
    )

  return(projects_experiment4)

}
