##' @title Get detail line
##' @param project_detail_components_experiment3
##'
##' @return
##' @author Shir Dekel
##' @export
get_project_detail_experiment3 <- function(project_detail_components_experiment3) {

  oil <-
    str_c(
      "establish an exploration site at an",
      project_detail_components_experiment3$oil$well_type,
      "location in",
      project_detail_components_experiment3$oil$location,
      "in order to see if the hydrocarbon supply is sufficient to establish a more permanent well",
      sep = " "
    )

  microchip <-
    str_c(
      "develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current",
      project_detail_components_experiment3$microchip,
      "market",
      sep = " "
    )

  record_deal <-
    str_c(
      "sign a new recording artist for their",
      project_detail_components_experiment3$record_deal,
      "music market",
      sep = " "
    )

  shipping_logistics <-
    str_c(
      "develop a new shipping route for a",
      project_detail_components_experiment3$shipping_logistics,
      "export market",
      sep = " "
    )

  restaurant_chain <-
    str_c(
      "develop a new franchise of",
      project_detail_components_experiment3$restaurant_chain,
      "restaurants",
      sep = " "
    )

  national_newspaper <-
    str_c(
      "develop a new nationally-distributed newspaper about",
      project_detail_components_experiment3$national_newspaper,
      sep = " "
    )

  pharmaceutical <-
    str_c(
      "develop a new pharmaceutical drug to help treat",
      project_detail_components_experiment3$pharmaceutical,
      sep = " "
    )

  railway <-
    str_c(
      "develop a new railway line in",
      project_detail_components_experiment3$railway,
      sep = " "
    )

  gmo <-
    str_c(
      "develop a new genetically modified",
      project_detail_components_experiment3$gmo,
      sep = " "
    )

  high_rise_construction <-
    str_c(
      "develop a new",
      str_c(
        project_detail_components_experiment3$high_rise_construction$storeys,
        "-storey high-rise with a"
      ),
      project_detail_components_experiment3$high_rise_construction$structural_system,
      "structural system",
      sep = " "
    )

  project_detail_experiment3 <-
    lst(
      oil,
      microchip,
      record_deal,
      shipping_logistics,
      restaurant_chain,
      national_newspaper,
      pharmaceutical,
      railway,
      gmo,
      high_rise_construction
    )

  return(project_detail_experiment3)

}
