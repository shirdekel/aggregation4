##' @title Get condition allocation columns

##' @return
##' @author Shir Dekel
##' @export
get_columns <- function() {
    columns <-
        insert_property(
            subject = insert_javascript("jsPsych.randomization.randomID(15)"),
            thesis_project = "aggregation",
            experiment = "experiment4",
            sample = "prolific",
            similarity = "low",
            awareness = insert_javascript("awareness_condition"),
            presentation = "separate",
            distribution = "absent",
            project_variation = insert_javascript("project_variation_condition"),
            current_project_choice_order = insert_javascript("1"),
            PROLIFIC_PID = insert_javascript("urlvar.PROLIFIC_PID"),
            STUDY_ID = insert_javascript("urlvar.STUDY_ID"),
            SESSION_ID = insert_javascript("urlvar.SESSION_ID")
        )

    return(columns)
}
