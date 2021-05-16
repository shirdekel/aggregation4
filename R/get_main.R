##' @title Get main experiment trials

##' @param randomize_order
##'
##' @param gambles
##'
##' @return
##' @author Shir Dekel
##' @export
get_main <- function(gambles, randomize_order = TRUE) {
    instructions_experiment4 <-
        get_instructions_experiment4() %>%
        unname()

    projects <-
        get_projects_experiment4(gambles)

    trials_experiment4 <-
        get_trials_experiment4(
            projects,
            randomize_order
        )

    main <-
        instructions_experiment4 %>%
        c(
            trials_experiment4 %>%
                flatten()
        ) %>%
        build_timeline() %>%
        flatten()

    return(main)
}
