##' @title Get project pair sample
##' @param detail
##' @return
##' @author Shir Dekel
##' @export
get_project_pair_sample <- function(detail) {

  project_pair_sample <-
    1:10 %>%
    map(
      ~ detail %>%
        sample(2) %>%
        flatten()
    )

  return(project_pair_sample)

}
