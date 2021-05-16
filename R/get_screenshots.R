##' @title Screenshots E4

##' @return
##' @author Shir Dekel
##' @export
get_screenshots <- function(experiment_directory) {
  file_name_materials_experiment4 <-
    get_file_name_materials_experiment4()

  materials_directory_experiment4 <-
    file.path("inst", "materials")

  file_path_materials <-
    shirthesis::get_file_path_materials(
      materials_directory_experiment4,
      file_name_materials_experiment4
    )

  casper_calls <-
    c(
      str_c(
        "this.click('#jspsych-instructions-next');",
        str_c(
          "this.click('.jspsych-btn');" %>%
            rep(3),
          collapse = "\n"
        ),
        sep = "\n"
      ),
      "this.click('#jspsych-instructions-next');" %>%
        rep(3),
      "this.click('#jspsych-survey-multi-choice-next');" %>%
        rep(20),
      "this.click('#jspsych-survey-html-form-next');" %>%
        rep(2),
      "this.click('#jspsych-html-button-response-button-0');"
    ) %>%
    slide(~., .before = Inf) %>%
    append(.[2], after = 2) %>% # instructions awareness
    append(.[5], after = 5) %>% # project 1 awareness
    map_chr(
      ~ str_c(
        .,
        collapse = "\n"
      )
    )

  awareness <-
    c(
      "naive" %>%
        rep(2),
      "aware" %>%
        rep(2),
      "naive",
      "aware" %>%
        rep(24)
    )

  webshot_eval <-
    list(
      casper_calls,
      awareness
    ) %>%
    pmap_chr(
      function(casper_calls, awareness) {
        str_c(
          "casper.thenOpen(this.getCurrentUrl() + '?project_variation=1&awareness=",
          awareness,
          str_c(
            "', function() {", casper_calls, "});",
            sep = "\n"
          )
        )
      }
    )

  file.path(experiment_directory, "index.html") %>%
      webshot::webshot(
          file = file_path_materials,
          eval = webshot_eval
      )
}
