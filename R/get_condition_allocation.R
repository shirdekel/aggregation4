##' @title Parse condition allocation JS code for E4

##' @return
##' @author Shir Dekel
##' @export
get_condition_allocation <- function() {
    1:10 %>%
        str_c(collapse = ", ") %>%
        str_c(
            "project_variation_condition = jsPsych.randomization.sampleWithReplacement([",
            .,
            "], 1)"
        ) %>%
        c(
            "awareness_condition = jsPsych.randomization.sampleWithoutReplacement(['naive', 'aware'], 1)[0]",
            "urlvar = jsPsych.data.urlVariables()",
            "if typeof urlvar.project_variation != 'undefined' then project_variation_condition = urlvar.project_variation;",
            "if typeof urlvar.awareness != 'undefined' then awareness_condition = urlvar.awareness;"
        ) %>%
        coffee_compile(bare = TRUE)
}
