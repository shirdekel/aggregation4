##' @title Get input-friendly components
##' @param project_detail_components_experiment3
##'
##' @return
##' @author Shir Dekel
##' @export
get_project_detail_components_input_experiment3 <- function(project_detail_components_experiment3) {

  project_detail_components_input_experiment3 <-
    project_detail_components_experiment3 %>%
    map_if(is.list,
           ~ .x %>%
             transpose() %>%
             map_chr(~ .x %>%
                       str_c(collapse = "-"))) %>%
    map(~ .x %>%
          str_replace_all(" ", "-") %>%
          str_remove_all(","))

  return(project_detail_components_input_experiment3)

}
