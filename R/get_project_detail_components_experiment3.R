##' @title Get long project detail components

##' @return
##' @author Shir Dekel
##' @export
get_project_detail_components_experiment3 <- function() {

  well_type <-
    c(
      "onshore",
      "offshore"
    ) %>%
    rep(5)

  location <-
    c(
      "Houston, US",
      "Kuala Lumpur, Malaysia",
      "Daqing, China",
      "Abu Dhabi, UAE",
      "Dhahran, Saudi Arabia",
      "Basra, Iraq",
      "Stavanger, Norway",
      "Calgary, Canada",
      "Omsk, Siberia",
      "Aberdeen, UK"
    )

  oil <-
    lst(
    well_type = well_type,
    location = location
  )

  microchip <-
    c(
      "personal computer",
      "smartphone",
      "microwave",
      "car controls",
      "DSLR camera",
      "gaming console",
      "military communication",
      "aerospace",
      "medical imaging machine",
      "GPS tracking device"
    )

  record_deal <-
    c(
      "hip hop",
      "classical",
      "R&B",
      "soul",
      "indie rock",
      "heavy metal",
      "pop",
      "folk",
      "electronic",
      "latin"
    )

  shipping_logistics <-
    c(
      "motorbike",
      "wheat",
      "kitchenware",
      "liquor",
      "power tools",
      "wrist watch",
      "artwork",
      "steel",
      "flat-screen TV",
      "wool"
    )

  restaurant_chain <-
    c(
      "italian",
      "burger",
      "mexican",
      "thai",
      "chinese",
      "barbeque",
      "sushi",
      "greek",
      "seafood",
      "buffet"
    )

  national_newspaper <-
    c(
      "electronics",
      "politics",
      "fashion",
      "Christian topics",
      "business",
      "science",
      "sport",
      "celebrity gossip",
      "current affairs",
      "foreign affairs"
    )

  pharmaceutical <-
    c(
      "leukaemia",
      "anaemia",
      "Sickle-cell disease",
      "Hunter syndrome",
      "immune dysregulation",
      "hypertension",
      "pneumonia",
      "angina",
      "Chronic lower respiratory disease",
      "Chronic kidney disease"
    )

  railway <-
    c(
      "Guangdong, China",
      "Uttar Pradesh, India",
      "California, USA",
      "West Java, Indonesia",
      "Punjab, Pakistan",
      "Minas Gerais, Brazil",
      "Kano State, Nigera",
      "Dhaka Division, Bangladesh",
      "Krasnodar Krai, Russia",
      "Oaxaca, Mexico"
    )

  gmo <-
    c(
      "potato crop enriched with Vitamin A",
      "tomato crop that induces a Hepatitis B immune response",
      "trout with increased growth rate",
      "corn crop with faster maturation",
      "animal feed with enzymes to enhance digestion",
      "herbicide tolerant melon",
      "insect resistant persimmon",
      "virus resistant orange",
      "sunflower oil with healthier fatty acid composition",
      "bacteria for clean fuel development"
    )

  storeys <-
    seq(from = 10,
        to = 55,
        by = 5)

  structural_system <-
    c(
      "coupled wall",
      "flat plate and flat slab",
      "rigid frame",
      "infilled frame",
      "braced frame",
      "shear wall",
      "wall-frame",
      "core and outrigger",
      "hybrid",
      "tube"
    )

  high_rise_construction <-
    lst(
      storeys,
      structural_system
    )

  project_detail_components_experiment3 <-
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

  return(project_detail_components_experiment3)

}
