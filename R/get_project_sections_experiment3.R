##' @title Get project sections E3
##' @param gambles
##' @param components
##' @param detail
##' @return
##' @author Shir Dekel
##' @export
get_project_sections_experiment3 <- function(gambles,
                                             components,
                                             detail) {

  outcome_negative <-
    gambles$outcome_dif - gambles$outcome_positive
  prob_positive <-
    gambles$prob_positive * 100
  prob_negative <-
    100 - prob_positive

  intro <-
    str_c(
      str_c(
        components$name,
        "is a business in your company that proposes to construct",
        components$type %>%
          map_chr(shirthesis::get_indefinite),
        components$type,
        "project",
        sep = " "
      ),
      str_c(
        "Specifically, they want to",
        detail,
        sep = " "
      ),
      sep = ". "
    )

  cost <-
    str_c(
      str_c(
        str_c(
          components$name,
          "'s research team has been investigating"
        ),
        components$investigation,
        sep = " "
      ),
      str_c(
        "Due to the",
        str_c(
          components$cost_explanation,
          ", they forecast the entire project to cost $",
          outcome_negative
        ),
        "million (the loss amount)",
        sep = " "
      ),
      sep = ". "
    )

  risk <-
    str_c(
      str_c(
        str_c(
          "The company would make $",
          gambles$outcome_dif %>%
            rep(length(gambles$outcome_positive))
        ),
        "million if the forecasted",
        components$forecast_details,
        sep = " "
      ),
      str_c(
        "The estimate for the anticipated chance of gain is based on",
        components$analysis_details %>%
          map(shirthesis::get_indefinite),
        components$analysis_details,
        sep = " "
      ),
      sep = ". "
    )

  gamble <-
    str_c(
      "To summarise this investment, there is a",
      str_c(
        prob_positive,
        "% chance of gaining $",
        gambles$outcome_positive
      ),
      "million (the forecasted revenue minus the cost amount) and a",
      str_c(
        prob_negative,
        "% chance of losing $",
        outcome_negative
      ),
      "million",
      sep = " "
    )

  project_sections_experiment3 <-
    list(
      intro,
      cost,
      risk,
      gamble
    )

  return(project_sections_experiment3)

}
