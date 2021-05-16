##' @title Get long project descriptions
##'
##' @param gambles
##' @param project_long_components
##' @param project_long_detail
##'
##' @return
##' @author Shir Dekel
##' @export
get_project_description_experiment3 <- function(gambles, project_components_experiment3, project_detail_experiment3) {

  project_sections_experiment3 <-
    get_project_sections_experiment3(
      gambles,
      components = project_components_experiment3,
      detail = project_detail_experiment3
    ) %>%
    transpose() %>%
    map(unlist)

  project_description_experiment3 <-
    project_sections_experiment3 %>%
    map(shuffle_project_sections_experiment3)

  return(project_description_experiment3)

}
