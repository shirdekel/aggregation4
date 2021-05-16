##' @title Get instructions for E4

##' @return
##' @author Shir Dekel
##' @export
get_instructions_experiment4 <- function() {

  instructions_intro <-
    p(
      "Imagine that you are an executive in a large company composed of many individual businesses. You need to make decisions about projects that come across your desk."
    )

  instructions_param <-
    tibble(
      condition = c("naive", "aware"),
      investment = c(
        "each investment",
        "your investments"
      ),
      project_number = c(
        "",
        "There will be 20 projects that you will decide on this quarter."
      )
    )

  instructions_main <-
    instructions_param %>%
    slide_chr(
      ~ div(
        instructions_intro,
        p(
          str_c(
            "As the executive, your pay will be determined by the performance of ",
            .x$investment,
            ". We want to know what choices you would actually make."
          )
        ),
        p(
          .x$project_number
        )
      ) %>%
        as.character()
    )

  instructions_experiment4 <-
    instructions_main %>%
    list(instructions_param$condition) %>%
    pmap(
      ~ trial_instructions(
        pages = c(
          "We will now give you the instructions for the task. Use the arrow buttons to browse these instructions",
          .x,
          "Press the 'Next' button to begin."
        ),
        show_clickable_nav = TRUE,
        data = insert_property(stage = "instructions")
      ) %>%
        build_timeline() %>%
        display_if(fn_data_condition(awareness == !!.y))
    ) %>%
    set_names(instructions_param$condition)

  return(instructions_experiment4)

}
