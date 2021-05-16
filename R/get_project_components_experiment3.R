##' @title Get details for long projects
##'
##' Names generated from namelix.com
##'
##' @return
##' @author Shir Dekel
##' @export
get_project_components_experiment3 <- function() {

  name <-
    c(
      "Refinera",
      "Microxy",
      "Vital Records",
      "Logivia",
      "Savoro",
      "Grown Media",
      "Biotechly",
      "FreightCog",
      "Evogenic",
      "Erectic"
    )

  type <-
    c(
      "oil well",
      "microchip",
      "record deal",
      "shipping logistics",
      "restaurant chain",
      "national newspaper",
      "pharmaceutical",
      "railway",
      "GMO",
      "high-rise construction"
    )

  investigation <-
    c(
      "a possible site in an as yet unexplored area",
      "the necessary components and infrastructure",
      "the necessary production and promotion",
      "the relevant storage and insurance requirements",
      "the relevant food and marketing requirements",
      "the relevant print and distribution requirements",
      "the necessary testing and laboratory requirements",
      "the required track construction and electrification system relevant to the region",
      "the relevant gene to be modified and potential environmental impact",
      "the relevant geotechnical and construction requirements"
    )

  cost_explanation <-
    c(
      "location and size of the site, and consultant fees (e.g., geologists)",
      "complexity and novelty of the IC, and IC design engineer salaries",
      "recording time, marketing requirements, and producer fees",
      "median size and volume of the cargo, and couriers rates",
      "menu items, furnishings, and back- and front-of-house salaries",
      "printing fees, marketing, and writer and editorial salaries",
      "chemical and equipment costs, and the pharmaceutical scientist salaries",
      "material and insurance costs, and construction worker salaries",
      "cultivation and labratory costs, and genetic engineer salaries",
      "material and land costs, and engineering firm contracts"
    )

  forecast_details <-
    c(
      "concentration and quality of recoverable hydrocarbons at the site eventuates",
      "yield (percentage of working ICs produced) eventuates",
      "record sales eventuate",
      "exporter demand eventuates",
      "customer attendance eventuates",
      "sales eventuate",
      "sales eventuate",
      "ticket sales and freight revenues eventuate",
      "consumer demand and regulatory approval eventuate",
      "residential and commercial property sales eventuate"
    )

  analysis_details <-
    c(
      "geological and seismic study of the site, and an analysis of previous similar sites",
      "electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs",
      "study of the distribution market, and an analysis of the record sales of previous similar recording artists",
      "study of freight risks, and an analysis of the demand of previous similar export markets",
      "study of culinary preference trends, and an analysis of the demand of previous similar restaurants",
      "study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers",
      "biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds",
      "study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines",
      "study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs",
      "study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties"
    )

  project_components_experiment3 <-
    list(
      name = name,
      type = type,
      investigation = investigation,
      cost_explanation = cost_explanation,
      forecast_details = forecast_details,
      analysis_details = analysis_details
    )

  return(project_components_experiment3)

}
