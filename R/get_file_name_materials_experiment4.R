##' @title Get E4 screenshot file names

##' @return
##' @author Shir Dekel
##' @export
get_file_name_materials_experiment4 <- function() {

  # Clean project type names and double
  project_type_clean <-
    1:2 %>%
    map(
      ~ get_project_components_experiment3() %>%
        .[["type"]] %>%
        str_replace_all(" ", "-") %>%
        str_c(.x, sep = "_")
    ) %>%
    unlist()

  file_name_materials_experiment4 <-
    c(
      str_c(
        "instructions",
        c(
          1,
          str_c(
            2,
            c(
              "naive",
              "aware"
            ),
            sep = "_"
          ),
          3
        )
      ),
      str_c(
        "project_choice",
        "naive",
        project_type_clean[[1]],
        sep = "_"
      ),
      str_c(
        "project_choice",
        "aware",
        project_type_clean,
        sep = "_"
      ),
      "project_expectation",
      "project_number",
      "porfolio_binary",
      "porfolio_number"
    )

  return(file_name_materials_experiment4)

}
