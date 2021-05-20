var safe_to_close_window = false;
function verifyClose() {
  if (safe_to_close_window == false) {
    event.returnValue = "Are you sure you want to exit? Your data has not been saved yet.";
  }
}
window.onbeforeunload = verifyClose;

var awareness_condition, project_variation_condition, urlvar;

project_variation_condition = jsPsych.randomization.sampleWithReplacement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1);

awareness_condition = jsPsych.randomization.sampleWithoutReplacement(['naive', 'aware'], 1)[0];

urlvar = jsPsych.data.urlVariables();

if (typeof urlvar.project_variation !== 'undefined') {
  project_variation_condition = urlvar.project_variation;
}

if (typeof urlvar.awareness !== 'undefined') {
  awareness_condition = urlvar.awareness;
}

function checkOther(val, id){
 var element=document.getElementById(id);
 if(val=='Other')
   element.style.display='block';
 else
   element.style.display='none';
}
jsPsych.data.addProperties({
  "subject": jsPsych.randomization.randomID(15),
  "thesis_project": "aggregation",
  "experiment": "experiment4",
  "sample": "prolific",
  "similarity": "low",
  "awareness": awareness_condition,
  "presentation": "separate",
  "distribution": "absent",
  "project_variation": project_variation_condition,
  "current_project_choice_order": 1,
  "PROLIFIC_PID": urlvar.PROLIFIC_PID,
  "STUDY_ID": urlvar.STUDY_ID,
  "SESSION_ID": urlvar.SESSION_ID
});

var timeline = {
  "timeline": [
    {
      "type": ["instructions"],
      "pages": ["<div>\n  <p>Welcome to the study.<\/p>\n  <p>Make sure to scroll down to the bottom of each page to see the navigation buttons.<\/p>\n<\/div>"],
      "key_forward": [39],
      "key_backward": [37],
      "allow_backward": true,
      "allow_keys": true,
      "show_clickable_nav": true,
      "button_label_previous": ["Previous"],
      "button_label_next": ["Next"],
      "post_trial_gap": [0],
      "data": {
        "stage": ["welcome"]
      }
    },
    {
      "timeline": [
        {
          "type": ["survey-html-form"],
          "html": ["<div>\n  <label for=\"prolific\">Enter your Prolific ID (24 alphanumeric characters, no spaces):<\/label>\n  <input type=\"text\" id=\"prolific\" name=\"prolific\" required minlength=\"24\" maxlength=\"24\" pattern=\"^[a-z0-9]+$\" size=\"30\"/>\n<\/div>"],
          "data": {
            "stage": ["id"]
          },
          "on_load": function() {
      if (typeof urlvar.PROLIFIC_PID !== 'undefined') {
        document.getElementById('prolific').setAttribute('value', urlvar.PROLIFIC_PID);
      }
    }
        },
        {
          "type": ["survey-html-form"],
          "html": ["<div>\n  <div>\n    <p>I would like to receive feedback about the overall results of this study.<\/p>\n    <input type=\"radio\" id=\"contact_yes\" name=\"contact\" value=\"yes\"/>\n    <label for=\"contact_yes\">YES<\/label>\n    <input type=\"radio\" id=\"contact_no\" name=\"contact\" value=\"no\" checked/>\n    <label for=\"contact_no\">NO<\/label>\n  <\/div>\n  <div>\n    <p>If you answered YES, please indicate your preferred form of feedback and address:<\/p>\n    <p>\n      Email:\n      <input type=\"text\" id=\"address\" name=\"address\"/>\n    <\/p>\n  <\/div>\n<\/div>"],
          "data": {
            "stage": ["contact"]
          }
        },
        {
          "type": ["survey-html-form"],
          "html": ["<ol style=\"text-align:left\">\n  <li>\n    <p>\n      <p>What is your sex?<\/p>\n      <input type=\"radio\" id=\"male\" name=\"sex\" value=\"male\" checked/>\n      <label for=\"male\">Male<\/label>\n      <input type=\"radio\" id=\"female\" name=\"sex\" value=\"female\"/>\n      <label for=\"female\">Female<\/label>\n    <\/p>\n  <\/li>\n  <li>\n    <p>\n      <p>\n        <label for=\"age\">What is your age?<\/label>\n      <\/p>\n      \n      <input type=\"number\" id=\"age\" name=\"age\" min=\"10\" max=\"100\" required style=\"width:70px\"/>\n      \n    <\/p>\n  <\/li>\n  <li><p>\n  <p>\n    <p>\n      <label for=\"language\">Do you speak a language other than English at home?<\/label>\n    <\/p>\n    <select id=\"language\" name=\"language\" onchange=\"checkOther(this.value, 'language_other');\" required>\n      <option value=\"\"><\/option>\n      <option value=\"No\">No<\/option>\n      <option value=\"Chinese\">Chinese<\/option>\n      <option value=\"Japanese\">Japanese<\/option>\n      <option value=\"Vietnamese\">Vietnamese<\/option>\n      <option value=\"Korean\">Korean<\/option>\n      <option value=\"Arabic\">Arabic<\/option>\n      <option value=\"Spanish\">Spanish<\/option>\n      <option value=\"Italian\">Italian<\/option>\n      <option value=\"Greek\">Greek<\/option>\n      <option value=\"Hebrew\">Hebrew<\/option>\n      <option value=\"Other\">Other<\/option>\n    <\/select>\n  <\/p>\n  <p>\n    <input type=\"text\" id=\"language_other\" name=\"language_other\" style=\"display:none;\" placeholder=\"Specify other\"/>\n  <\/p>\n<\/p><\/li>\n  <li>\n    <p>\n      <p>\n        <label for=\"business_edu\">How many years of experience do you have studying business?<\/label>\n      <\/p>\n      \n      <input type=\"number\" id=\"business_edu\" name=\"business_edu\" min=\"0\" max=\"100\" required style=\"width:70px\"/>\n      years\n    <\/p>\n  <\/li>\n  <li>\n    <p>\n      <p>\n        <label for=\"business_exp\">How many years of experience do you have working in a corporate business setting?<\/label>\n      <\/p>\n      \n      <input type=\"number\" id=\"business_exp\" name=\"business_exp\" min=\"0\" max=\"100\" required style=\"width:70px\"/>\n      years\n    <\/p>\n  <\/li>\n  <li>\n    <p>\n      <p>Do you currently work in an executive or managerial role?<\/p>\n      <input type=\"radio\" id=\"current_yes\" name=\"current\" value=\"yes\"/>\n      <label for=\"current_yes\">Yes<\/label>\n      <input type=\"radio\" id=\"current_no\" name=\"current\" value=\"no\" checked/>\n      <label for=\"current_no\">No<\/label>\n    <\/p>\n  <\/li>\n<\/ol>"],
          "data": {
            "stage": ["demographics"]
          },
          "on_finish": function(data){
    data.current_response = JSON.parse(data.responses).current
  }
        },
        {
          "timeline": [
            {
              "type": ["survey-html-form"],
              "html": ["<ol style=\"text-align:left\">\n  <li>\n    <p>\n      <label for=\"company_name\">What is your company name? (optional)<\/label>\n      <input type=\"text\" id=\"company_name\" name=\"company_name\"/>\n    <\/p>\n  <\/li>\n  <li><p>\n  <p>\n    <p>\n      <label for=\"sector\">What is your primary company sector?<\/label>\n    <\/p>\n    <select id=\"sector\" name=\"sector\" onchange=\"checkOther(this.value, 'sector_other');\" required>\n      <option value=\"\"><\/option>\n      <option value=\"Aerospace &amp; Defense\">Aerospace &amp; Defense<\/option>\n      <option value=\"Agriculture, Farming, Food Processing\">Agriculture, Farming, Food Processing<\/option>\n      <option value=\"Asset Management - Brokers, Fund Mgmt, Stock Exchange\">Asset Management - Brokers, Fund Mgmt, Stock Exchange<\/option>\n      <option value=\"Automotive\">Automotive<\/option>\n      <option value=\"Banking - Payments, Central Banks, Retail, Wholesale, Investment\">Banking - Payments, Central Banks, Retail, Wholesale, Investment<\/option>\n      <option value=\"Business Services - Legal, Accounting, Security, Consulting, PR\">Business Services - Legal, Accounting, Security, Consulting, PR<\/option>\n      <option value=\"Chemicals\">Chemicals<\/option>\n      <option value=\"Computers &amp; Electronics, Software, High Tech\">Computers &amp; Electronics, Software, High Tech<\/option>\n      <option value=\"Consumer Products &amp; Packaged Goods\">Consumer Products &amp; Packaged Goods<\/option>\n      <option value=\"Diversified Conglomerate\">Diversified Conglomerate<\/option>\n      <option value=\"Energy - Power, Gas, Electricity, Water, Renewables\">Energy - Power, Gas, Electricity, Water, Renewables<\/option>\n      <option value=\"Engineering, Construction, Infrastructure, Real Estate\">Engineering, Construction, Infrastructure, Real Estate<\/option>\n      <option value=\"Health Services - Payor, Provider\">Health Services - Payor, Provider<\/option>\n      <option value=\"Insurance - Pension, Financial, Health \tLeisure - Sports, Parks, Theater, Gambling\">Insurance - Pension, Financial, Health \tLeisure - Sports, Parks, Theater, Gambling<\/option>\n      <option value=\"Machinery &amp; Industrial Goods\">Machinery &amp; Industrial Goods<\/option>\n      <option value=\"Media - Broadcasting, Publishing, Information\">Media - Broadcasting, Publishing, Information<\/option>\n      <option value=\"Metals, Mining, Ore\">Metals, Mining, Ore<\/option>\n      <option value=\"Paper, Packaging, Forestry\">Paper, Packaging, Forestry<\/option>\n      <option value=\"Petroleum, Oil\">Petroleum, Oil<\/option>\n      <option value=\"Pharmaceuticals, Medical Products &amp; Equipment\">Pharmaceuticals, Medical Products &amp; Equipment<\/option>\n      <option value=\"Private Equity, FOB, Venture Capital\">Private Equity, FOB, Venture Capital<\/option>\n      <option value=\"Public Sector, Government\">Public Sector, Government<\/option>\n      <option value=\"Retail, Wholesale, Restaurants\">Retail, Wholesale, Restaurants<\/option>\n      <option value=\"Social Sector, Non-profit, Charity\">Social Sector, Non-profit, Charity<\/option>\n      <option value=\"Telecommunications\">Telecommunications<\/option>\n      <option value=\"Travel, Transport &amp; Logistics, Hotels\">Travel, Transport &amp; Logistics, Hotels<\/option>\n      <option value=\"Other\">Other<\/option>\n    <\/select>\n  <\/p>\n  <p>\n    <input type=\"text\" id=\"sector_other\" name=\"sector_other\" style=\"display:none;\" placeholder=\"Specify other\"/>\n  <\/p>\n<\/p><\/li>\n  <li>\n    <p>\n      <p>\n        <label for=\"employees\">Approximately, how many employees work at your company?<\/label>\n      <\/p>\n      \n      <input type=\"number\" id=\"employees\" name=\"employees\" min=\"0\" max=\"3e+06\" required style=\"width:70px\"/>\n      \n    <\/p>\n  <\/li>\n  <li>\n    <p>\n      <p>\n        <label for=\"revenue\">What is the size of your company's revenues?<\/label>\n      <\/p>\n      $\n      <input type=\"number\" id=\"revenue\" name=\"revenue\" min=\"0\" max=\"6e+05\" required style=\"width:70px\"/>\n      million\n    <\/p>\n  <\/li>\n  <li><p>\n  <p>\n    <p>\n      <label for=\"role_company\">What is your role in the company?<\/label>\n    <\/p>\n    <select id=\"role_company\" name=\"role_company\" onchange=\"checkOther(this.value, 'role_company_other');\" required>\n      <option value=\"\"><\/option>\n      <option value=\"CEO\">CEO<\/option>\n      <option value=\"Corporate President\">Corporate President<\/option>\n      <option value=\"Chairman\">Chairman<\/option>\n      <option value=\"Managing Director\">Managing Director<\/option>\n      <option value=\"CFO\">CFO<\/option>\n      <option value=\"COO\">COO<\/option>\n      <option value=\"CSO\">CSO<\/option>\n      <option value=\"Other C-level executive\">Other C-level executive<\/option>\n      <option value=\"Senior strategist\">Senior strategist<\/option>\n      <option value=\"EVP\">EVP<\/option>\n      <option value=\"BU/Divisional President\">BU/Divisional President<\/option>\n      <option value=\"SVP\">SVP<\/option>\n      <option value=\"VP\">VP<\/option>\n      <option value=\"Business Leader\">Business Leader<\/option>\n      <option value=\"Business Member\">Business Member<\/option>\n      <option value=\"Other\">Other<\/option>\n    <\/select>\n  <\/p>\n  <p>\n    <input type=\"text\" id=\"role_company_other\" name=\"role_company_other\" style=\"display:none;\" placeholder=\"Specify other\"/>\n  <\/p>\n<\/p><\/li>\n  <li><p>\n  <p>\n    <p>\n      <label for=\"role_allocation\">What is your role in resource allocation decisions?<\/label>\n    <\/p>\n    <select id=\"role_allocation\" name=\"role_allocation\" onchange=\"checkOther(this.value, 'role_allocation_other');\" required>\n      <option value=\"\"><\/option>\n      <option value=\"Decide on allocations for the company\">Decide on allocations for the company<\/option>\n      <option value=\"Decide on allocations for business unit or division\">Decide on allocations for business unit or division<\/option>\n      <option value=\"Decide on allocations for line of business level\">Decide on allocations for line of business level<\/option>\n      <option value=\"Provide information and analysis for the decision-makers at the company\">Provide information and analysis for the decision-makers at the company<\/option>\n      <option value=\"Provide information and analysis for the decision-makers at business unit or division\">Provide information and analysis for the decision-makers at business unit or division<\/option>\n      <option value=\"Provide information and analysis for the decision-makers at line of business level\">Provide information and analysis for the decision-makers at line of business level<\/option>\n      <option value=\"Other\">Other<\/option>\n    <\/select>\n  <\/p>\n  <p>\n    <input type=\"text\" id=\"role_allocation_other\" name=\"role_allocation_other\" style=\"display:none;\" placeholder=\"Specify other\"/>\n  <\/p>\n<\/p><\/li>\n  <li>\n    <p>\n      <p>\n        <label for=\"budget\">How large is the annual budget under your discretion?<\/label>\n      <\/p>\n      $\n      <input type=\"number\" id=\"budget\" name=\"budget\" min=\"0\" max=\"6e+05\" required style=\"width:70px\"/>\n      million\n    <\/p>\n  <\/li>\n<\/ol>"],
              "data": {
                "stage": ["business_information"]
              }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.current_response == "yes"){
        return true;
      } else {
        return false;
      }
    }
        }
      ]
    },
    {
      "timeline": [
        {
          "timeline": [
            {
              "type": ["instructions"],
              "pages": ["We will now give you the instructions for the task. Use the arrow buttons to browse these instructions", "<div>\n  <p>Imagine that you are an executive in a large company composed of many individual businesses. You need to make decisions about projects that come across your desk.<\/p>\n  <p>As the executive, your pay will be determined by the performance of each investment. We want to know what choices you would actually make.<\/p>\n  <p><\/p>\n<\/div>", "Press the 'Next' button to begin."],
              "key_forward": [39],
              "key_backward": [37],
              "allow_backward": true,
              "allow_keys": true,
              "show_clickable_nav": true,
              "button_label_previous": ["Previous"],
              "button_label_next": ["Next"],
              "post_trial_gap": [0],
              "data": {
                "stage": ["instructions"]
              }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "naive"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "type": ["instructions"],
              "pages": ["We will now give you the instructions for the task. Use the arrow buttons to browse these instructions", "<div>\n  <p>Imagine that you are an executive in a large company composed of many individual businesses. You need to make decisions about projects that come across your desk.<\/p>\n  <p>As the executive, your pay will be determined by the performance of your investments. We want to know what choices you would actually make.<\/p>\n  <p>There will be 20 projects that you will decide on this quarter.<\/p>\n<\/div>", "Press the 'Next' button to begin."],
              "key_forward": [39],
              "key_backward": [37],
              "allow_backward": true,
              "allow_keys": true,
              "show_clickable_nav": true,
              "button_label_previous": ["Previous"],
              "button_label_next": ["Next"],
              "post_trial_gap": [0],
              "data": {
                "stage": ["instructions"]
              }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "aware"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": ["<div>\n  <p>Below is a description of the current project.<\/p>\n  <p>Indicate below whether you would invest in the project:<\/p>\n<\/div>"],
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an onshore location in Houston, US in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["oil-well_onshore-Houston-US_125_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current personal computer market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 60% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["microchip_personal-computer_125_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their hip hop music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $50 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 35% chance of gaining $190 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $50 million"]).join('. ') + '.',
                      "name": ["record-deal_hip-hop_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a motorbike export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $55 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 40% chance of gaining $185 million (the forecasted revenue minus the cost amount) and a 60% chance of losing $55 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_motorbike_185_240_0.4"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of italian restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $85 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 45% chance of gaining $155 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $85 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_italian_155_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about electronics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["national-newspaper_electronics_175_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat leukaemia","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 60% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_leukaemia_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Guangdong, China","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $120 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 60% chance of gaining $120 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $120 million"]).join('. ') + '.',
                      "name": ["railway_Guangdong-China_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified potato crop enriched with Vitamin A","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["GMO_potato-crop-enriched-with-Vitamin-A_175_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 10-storey high-rise with a coupled wall structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $140 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 75% chance of gaining $100 million (the forecasted revenue minus the cost amount) and a 25% chance of losing $140 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_10-coupled-wall_100_240_0.75"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an offshore location in Kuala Lumpur, Malaysia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["oil-well_offshore-Kuala-Lumpur-Malaysia_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current smartphone market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $90 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 45% chance of gaining $150 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $90 million"]).join('. ') + '.',
                      "name": ["microchip_smartphone_150_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their classical music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 55% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["record-deal_classical_115_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a wheat export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $60 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 35% chance of gaining $180 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $60 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_wheat_180_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of burger restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $95 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 55% chance of gaining $145 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $95 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_burger_145_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about politics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $45 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $195 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $45 million"]).join('. ') + '.',
                      "name": ["national-newspaper_politics_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat anaemia","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 70% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_anaemia_115_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Uttar Pradesh, India","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 65% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 35% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["railway_Uttar-Pradesh-India_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified tomato crop that induces a Hepatitis B immune response","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $75 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $165 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $75 million"]).join('. ') + '.',
                      "name": ["GMO_tomato-crop-that-induces-a-Hepatitis-B-immune-response_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 15-storey high-rise with a flat plate and flat slab structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 70% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_15-flat-plate-and-flat-slab_105_240_0.7"]
                    }
                  ],
                  "randomize_order": false
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "naive"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 1){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": ["<div>\n  <p>Below is a description of the current project.<\/p>\n  <p>Indicate below whether you would invest in the project:<\/p>\n<\/div>"],
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an onshore location in Dhahran, Saudi Arabia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["oil-well_onshore-Dhahran-Saudi-Arabia_125_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current DSLR camera market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 60% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["microchip_DSLR-camera_125_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their indie rock music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $50 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 35% chance of gaining $190 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $50 million"]).join('. ') + '.',
                      "name": ["record-deal_indie-rock_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a power tools export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $55 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 40% chance of gaining $185 million (the forecasted revenue minus the cost amount) and a 60% chance of losing $55 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_power-tools_185_240_0.4"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of chinese restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $85 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 45% chance of gaining $155 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $85 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_chinese_155_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about business","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["national-newspaper_business_175_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat immune dysregulation","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 60% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_immune-dysregulation_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Punjab, Pakistan","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $120 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 60% chance of gaining $120 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $120 million"]).join('. ') + '.',
                      "name": ["railway_Punjab-Pakistan_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified animal feed with enzymes to enhance digestion","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["GMO_animal-feed-with-enzymes-to-enhance-digestion_175_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 30-storey high-rise with a braced frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $140 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 75% chance of gaining $100 million (the forecasted revenue minus the cost amount) and a 25% chance of losing $140 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_30-braced-frame_100_240_0.75"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an onshore location in Stavanger, Norway in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["oil-well_onshore-Stavanger-Norway_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current military communication market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $90 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 45% chance of gaining $150 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $90 million"]).join('. ') + '.',
                      "name": ["microchip_military-communication_150_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their pop music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 55% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["record-deal_pop_115_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a artwork export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $60 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 35% chance of gaining $180 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $60 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_artwork_180_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of sushi restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $95 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 55% chance of gaining $145 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $95 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_sushi_145_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about sport","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $45 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $195 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $45 million"]).join('. ') + '.',
                      "name": ["national-newspaper_sport_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat pneumonia","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 70% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_pneumonia_115_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Kano State, Nigera","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 65% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 35% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["railway_Kano-State-Nigera_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified insect resistant persimmon","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $75 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $165 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $75 million"]).join('. ') + '.',
                      "name": ["GMO_insect-resistant-persimmon_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 40-storey high-rise with a wall-frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 70% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_40-wall-frame_105_240_0.7"]
                    }
                  ],
                  "randomize_order": false
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "naive"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 2){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": ["<div>\n  <p>Below is a description of the current project.<\/p>\n  <p>Indicate below whether you would invest in the project:<\/p>\n<\/div>"],
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an offshore location in Calgary, Canada in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["oil-well_offshore-Calgary-Canada_125_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current aerospace market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 60% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["microchip_aerospace_125_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their folk music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $50 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 35% chance of gaining $190 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $50 million"]).join('. ') + '.',
                      "name": ["record-deal_folk_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a steel export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $55 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 40% chance of gaining $185 million (the forecasted revenue minus the cost amount) and a 60% chance of losing $55 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_steel_185_240_0.4"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of greek restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $85 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 45% chance of gaining $155 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $85 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_greek_155_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about celebrity gossip","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["national-newspaper_celebrity-gossip_175_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat angina","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 60% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_angina_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Dhaka Division, Bangladesh","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $120 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 60% chance of gaining $120 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $120 million"]).join('. ') + '.',
                      "name": ["railway_Dhaka-Division-Bangladesh_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified virus resistant orange","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["GMO_virus-resistant-orange_175_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 45-storey high-rise with a core and outrigger structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $140 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 75% chance of gaining $100 million (the forecasted revenue minus the cost amount) and a 25% chance of losing $140 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_45-core-and-outrigger_100_240_0.75"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an offshore location in Abu Dhabi, UAE in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["oil-well_offshore-Abu-Dhabi-UAE_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current car controls market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $90 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 45% chance of gaining $150 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $90 million"]).join('. ') + '.',
                      "name": ["microchip_car-controls_150_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their soul music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 55% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["record-deal_soul_115_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a liquor export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $60 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 35% chance of gaining $180 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $60 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_liquor_180_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of thai restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $95 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 55% chance of gaining $145 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $95 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_thai_145_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about Christian topics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $45 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $195 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $45 million"]).join('. ') + '.',
                      "name": ["national-newspaper_Christian-topics_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat Hunter syndrome","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 70% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_Hunter-syndrome_115_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in West Java, Indonesia","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 65% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 35% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["railway_West-Java-Indonesia_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified corn crop with faster maturation","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $75 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $165 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $75 million"]).join('. ') + '.',
                      "name": ["GMO_corn-crop-with-faster-maturation_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 25-storey high-rise with a infilled frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 70% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_25-infilled-frame_105_240_0.7"]
                    }
                  ],
                  "randomize_order": false
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "naive"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 3){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": ["<div>\n  <p>Below is a description of the current project.<\/p>\n  <p>Indicate below whether you would invest in the project:<\/p>\n<\/div>"],
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an onshore location in Daqing, China in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["oil-well_onshore-Daqing-China_125_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current microwave market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 60% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["microchip_microwave_125_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their R&B music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $50 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 35% chance of gaining $190 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $50 million"]).join('. ') + '.',
                      "name": ["record-deal_R&B_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a kitchenware export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $55 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 40% chance of gaining $185 million (the forecasted revenue minus the cost amount) and a 60% chance of losing $55 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_kitchenware_185_240_0.4"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of mexican restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $85 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 45% chance of gaining $155 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $85 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_mexican_155_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about fashion","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["national-newspaper_fashion_175_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat Sickle-cell disease","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 60% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_Sickle-cell-disease_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in California, USA","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $120 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 60% chance of gaining $120 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $120 million"]).join('. ') + '.',
                      "name": ["railway_California-USA_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified trout with increased growth rate","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["GMO_trout-with-increased-growth-rate_175_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 20-storey high-rise with a rigid frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $140 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 75% chance of gaining $100 million (the forecasted revenue minus the cost amount) and a 25% chance of losing $140 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_20-rigid-frame_100_240_0.75"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an onshore location in Stavanger, Norway in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["oil-well_onshore-Stavanger-Norway_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current military communication market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $90 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 45% chance of gaining $150 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $90 million"]).join('. ') + '.',
                      "name": ["microchip_military-communication_150_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their pop music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 55% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["record-deal_pop_115_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a artwork export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $60 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 35% chance of gaining $180 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $60 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_artwork_180_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of sushi restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $95 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 55% chance of gaining $145 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $95 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_sushi_145_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about sport","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $45 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $195 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $45 million"]).join('. ') + '.',
                      "name": ["national-newspaper_sport_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat pneumonia","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 70% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_pneumonia_115_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Kano State, Nigera","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 65% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 35% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["railway_Kano-State-Nigera_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified insect resistant persimmon","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $75 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $165 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $75 million"]).join('. ') + '.',
                      "name": ["GMO_insect-resistant-persimmon_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 40-storey high-rise with a wall-frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 70% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_40-wall-frame_105_240_0.7"]
                    }
                  ],
                  "randomize_order": false
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "naive"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 4){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": ["<div>\n  <p>Below is a description of the current project.<\/p>\n  <p>Indicate below whether you would invest in the project:<\/p>\n<\/div>"],
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an onshore location in Daqing, China in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["oil-well_onshore-Daqing-China_125_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current microwave market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 60% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["microchip_microwave_125_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their R&B music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $50 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 35% chance of gaining $190 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $50 million"]).join('. ') + '.',
                      "name": ["record-deal_R&B_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a kitchenware export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $55 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 40% chance of gaining $185 million (the forecasted revenue minus the cost amount) and a 60% chance of losing $55 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_kitchenware_185_240_0.4"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of mexican restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $85 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 45% chance of gaining $155 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $85 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_mexican_155_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about fashion","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["national-newspaper_fashion_175_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat Sickle-cell disease","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 60% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_Sickle-cell-disease_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in California, USA","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $120 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 60% chance of gaining $120 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $120 million"]).join('. ') + '.',
                      "name": ["railway_California-USA_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified trout with increased growth rate","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["GMO_trout-with-increased-growth-rate_175_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 20-storey high-rise with a rigid frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $140 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 75% chance of gaining $100 million (the forecasted revenue minus the cost amount) and a 25% chance of losing $140 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_20-rigid-frame_100_240_0.75"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an offshore location in Kuala Lumpur, Malaysia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["oil-well_offshore-Kuala-Lumpur-Malaysia_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current smartphone market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $90 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 45% chance of gaining $150 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $90 million"]).join('. ') + '.',
                      "name": ["microchip_smartphone_150_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their classical music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 55% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["record-deal_classical_115_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a wheat export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $60 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 35% chance of gaining $180 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $60 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_wheat_180_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of burger restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $95 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 55% chance of gaining $145 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $95 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_burger_145_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about politics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $45 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $195 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $45 million"]).join('. ') + '.',
                      "name": ["national-newspaper_politics_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat anaemia","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 70% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_anaemia_115_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Uttar Pradesh, India","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 65% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 35% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["railway_Uttar-Pradesh-India_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified tomato crop that induces a Hepatitis B immune response","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $75 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $165 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $75 million"]).join('. ') + '.',
                      "name": ["GMO_tomato-crop-that-induces-a-Hepatitis-B-immune-response_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 15-storey high-rise with a flat plate and flat slab structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 70% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_15-flat-plate-and-flat-slab_105_240_0.7"]
                    }
                  ],
                  "randomize_order": false
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "naive"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 5){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": ["<div>\n  <p>Below is a description of the current project.<\/p>\n  <p>Indicate below whether you would invest in the project:<\/p>\n<\/div>"],
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an offshore location in Abu Dhabi, UAE in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["oil-well_offshore-Abu-Dhabi-UAE_125_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current car controls market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 60% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["microchip_car-controls_125_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their soul music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $50 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 35% chance of gaining $190 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $50 million"]).join('. ') + '.',
                      "name": ["record-deal_soul_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a liquor export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $55 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 40% chance of gaining $185 million (the forecasted revenue minus the cost amount) and a 60% chance of losing $55 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_liquor_185_240_0.4"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of thai restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $85 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 45% chance of gaining $155 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $85 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_thai_155_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about Christian topics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["national-newspaper_Christian-topics_175_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat Hunter syndrome","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 60% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_Hunter-syndrome_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in West Java, Indonesia","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $120 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 60% chance of gaining $120 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $120 million"]).join('. ') + '.',
                      "name": ["railway_West-Java-Indonesia_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified corn crop with faster maturation","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["GMO_corn-crop-with-faster-maturation_175_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 25-storey high-rise with a infilled frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $140 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 75% chance of gaining $100 million (the forecasted revenue minus the cost amount) and a 25% chance of losing $140 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_25-infilled-frame_100_240_0.75"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an onshore location in Daqing, China in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["oil-well_onshore-Daqing-China_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current microwave market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $90 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 45% chance of gaining $150 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $90 million"]).join('. ') + '.',
                      "name": ["microchip_microwave_150_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their R&B music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 55% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["record-deal_R&B_115_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a kitchenware export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $60 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 35% chance of gaining $180 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $60 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_kitchenware_180_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of mexican restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $95 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 55% chance of gaining $145 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $95 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_mexican_145_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about fashion","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $45 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $195 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $45 million"]).join('. ') + '.',
                      "name": ["national-newspaper_fashion_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat Sickle-cell disease","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 70% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_Sickle-cell-disease_115_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in California, USA","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 65% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 35% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["railway_California-USA_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified trout with increased growth rate","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $75 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $165 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $75 million"]).join('. ') + '.',
                      "name": ["GMO_trout-with-increased-growth-rate_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 20-storey high-rise with a rigid frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 70% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_20-rigid-frame_105_240_0.7"]
                    }
                  ],
                  "randomize_order": false
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "naive"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 6){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": ["<div>\n  <p>Below is a description of the current project.<\/p>\n  <p>Indicate below whether you would invest in the project:<\/p>\n<\/div>"],
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an onshore location in Dhahran, Saudi Arabia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["oil-well_onshore-Dhahran-Saudi-Arabia_125_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current DSLR camera market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 60% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["microchip_DSLR-camera_125_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their indie rock music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $50 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 35% chance of gaining $190 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $50 million"]).join('. ') + '.',
                      "name": ["record-deal_indie-rock_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a power tools export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $55 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 40% chance of gaining $185 million (the forecasted revenue minus the cost amount) and a 60% chance of losing $55 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_power-tools_185_240_0.4"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of chinese restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $85 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 45% chance of gaining $155 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $85 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_chinese_155_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about business","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["national-newspaper_business_175_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat immune dysregulation","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 60% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_immune-dysregulation_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Punjab, Pakistan","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $120 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 60% chance of gaining $120 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $120 million"]).join('. ') + '.',
                      "name": ["railway_Punjab-Pakistan_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified animal feed with enzymes to enhance digestion","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["GMO_animal-feed-with-enzymes-to-enhance-digestion_175_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 30-storey high-rise with a braced frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $140 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 75% chance of gaining $100 million (the forecasted revenue minus the cost amount) and a 25% chance of losing $140 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_30-braced-frame_100_240_0.75"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an offshore location in Basra, Iraq in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["oil-well_offshore-Basra-Iraq_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current gaming console market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $90 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 45% chance of gaining $150 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $90 million"]).join('. ') + '.',
                      "name": ["microchip_gaming-console_150_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their heavy metal music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 55% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["record-deal_heavy-metal_115_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a wrist watch export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $60 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 35% chance of gaining $180 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $60 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_wrist-watch_180_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of barbeque restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $95 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 55% chance of gaining $145 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $95 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_barbeque_145_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about science","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $45 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $195 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $45 million"]).join('. ') + '.',
                      "name": ["national-newspaper_science_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat hypertension","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 70% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_hypertension_115_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Minas Gerais, Brazil","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 65% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 35% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["railway_Minas-Gerais-Brazil_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified herbicide tolerant melon","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $75 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $165 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $75 million"]).join('. ') + '.',
                      "name": ["GMO_herbicide-tolerant-melon_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 35-storey high-rise with a shear wall structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 70% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_35-shear-wall_105_240_0.7"]
                    }
                  ],
                  "randomize_order": false
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "naive"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 7){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": ["<div>\n  <p>Below is a description of the current project.<\/p>\n  <p>Indicate below whether you would invest in the project:<\/p>\n<\/div>"],
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an onshore location in Houston, US in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["oil-well_onshore-Houston-US_125_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current personal computer market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 60% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["microchip_personal-computer_125_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their hip hop music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $50 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 35% chance of gaining $190 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $50 million"]).join('. ') + '.',
                      "name": ["record-deal_hip-hop_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a motorbike export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $55 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 40% chance of gaining $185 million (the forecasted revenue minus the cost amount) and a 60% chance of losing $55 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_motorbike_185_240_0.4"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of italian restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $85 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 45% chance of gaining $155 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $85 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_italian_155_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about electronics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["national-newspaper_electronics_175_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat leukaemia","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 60% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_leukaemia_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Guangdong, China","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $120 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 60% chance of gaining $120 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $120 million"]).join('. ') + '.',
                      "name": ["railway_Guangdong-China_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified potato crop enriched with Vitamin A","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["GMO_potato-crop-enriched-with-Vitamin-A_175_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 10-storey high-rise with a coupled wall structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $140 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 75% chance of gaining $100 million (the forecasted revenue minus the cost amount) and a 25% chance of losing $140 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_10-coupled-wall_100_240_0.75"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an offshore location in Calgary, Canada in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["oil-well_offshore-Calgary-Canada_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current aerospace market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $90 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 45% chance of gaining $150 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $90 million"]).join('. ') + '.',
                      "name": ["microchip_aerospace_150_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their folk music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 55% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["record-deal_folk_115_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a steel export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $60 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 35% chance of gaining $180 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $60 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_steel_180_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of greek restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $95 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 55% chance of gaining $145 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $95 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_greek_145_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about celebrity gossip","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $45 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $195 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $45 million"]).join('. ') + '.',
                      "name": ["national-newspaper_celebrity-gossip_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat angina","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 70% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_angina_115_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Dhaka Division, Bangladesh","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 65% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 35% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["railway_Dhaka-Division-Bangladesh_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified virus resistant orange","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $75 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $165 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $75 million"]).join('. ') + '.',
                      "name": ["GMO_virus-resistant-orange_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 45-storey high-rise with a core and outrigger structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 70% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_45-core-and-outrigger_105_240_0.7"]
                    }
                  ],
                  "randomize_order": false
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "naive"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 8){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": ["<div>\n  <p>Below is a description of the current project.<\/p>\n  <p>Indicate below whether you would invest in the project:<\/p>\n<\/div>"],
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an onshore location in Daqing, China in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["oil-well_onshore-Daqing-China_125_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current microwave market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 60% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["microchip_microwave_125_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their R&B music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $50 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 35% chance of gaining $190 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $50 million"]).join('. ') + '.',
                      "name": ["record-deal_R&B_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a kitchenware export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $55 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 40% chance of gaining $185 million (the forecasted revenue minus the cost amount) and a 60% chance of losing $55 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_kitchenware_185_240_0.4"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of mexican restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $85 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 45% chance of gaining $155 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $85 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_mexican_155_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about fashion","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["national-newspaper_fashion_175_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat Sickle-cell disease","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 60% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_Sickle-cell-disease_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in California, USA","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $120 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 60% chance of gaining $120 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $120 million"]).join('. ') + '.',
                      "name": ["railway_California-USA_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified trout with increased growth rate","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["GMO_trout-with-increased-growth-rate_175_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 20-storey high-rise with a rigid frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $140 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 75% chance of gaining $100 million (the forecasted revenue minus the cost amount) and a 25% chance of losing $140 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_20-rigid-frame_100_240_0.75"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an offshore location in Basra, Iraq in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["oil-well_offshore-Basra-Iraq_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current gaming console market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $90 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 45% chance of gaining $150 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $90 million"]).join('. ') + '.',
                      "name": ["microchip_gaming-console_150_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their heavy metal music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 55% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["record-deal_heavy-metal_115_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a wrist watch export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $60 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 35% chance of gaining $180 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $60 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_wrist-watch_180_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of barbeque restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $95 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 55% chance of gaining $145 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $95 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_barbeque_145_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about science","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $45 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $195 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $45 million"]).join('. ') + '.',
                      "name": ["national-newspaper_science_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat hypertension","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 70% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_hypertension_115_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Minas Gerais, Brazil","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 65% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 35% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["railway_Minas-Gerais-Brazil_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified herbicide tolerant melon","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $75 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $165 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $75 million"]).join('. ') + '.',
                      "name": ["GMO_herbicide-tolerant-melon_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 35-storey high-rise with a shear wall structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 70% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_35-shear-wall_105_240_0.7"]
                    }
                  ],
                  "randomize_order": false
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "naive"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 9){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": ["<div>\n  <p>Below is a description of the current project.<\/p>\n  <p>Indicate below whether you would invest in the project:<\/p>\n<\/div>"],
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an offshore location in Aberdeen, UK in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["oil-well_offshore-Aberdeen-UK_125_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current GPS tracking device market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 60% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["microchip_GPS-tracking-device_125_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their latin music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $50 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 35% chance of gaining $190 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $50 million"]).join('. ') + '.',
                      "name": ["record-deal_latin_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a wool export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $55 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 40% chance of gaining $185 million (the forecasted revenue minus the cost amount) and a 60% chance of losing $55 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_wool_185_240_0.4"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of buffet restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $85 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 45% chance of gaining $155 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $85 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_buffet_155_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about foreign affairs","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["national-newspaper_foreign-affairs_175_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat Chronic kidney disease","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 60% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_Chronic-kidney-disease_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Oaxaca, Mexico","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $120 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 60% chance of gaining $120 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $120 million"]).join('. ') + '.',
                      "name": ["railway_Oaxaca-Mexico_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified bacteria for clean fuel development","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["GMO_bacteria-for-clean-fuel-development_175_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 55-storey high-rise with a tube structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $140 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 75% chance of gaining $100 million (the forecasted revenue minus the cost amount) and a 25% chance of losing $140 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_55-tube_100_240_0.75"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an offshore location in Abu Dhabi, UAE in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["oil-well_offshore-Abu-Dhabi-UAE_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current car controls market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $90 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 45% chance of gaining $150 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $90 million"]).join('. ') + '.',
                      "name": ["microchip_car-controls_150_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their soul music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 55% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["record-deal_soul_115_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a liquor export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $60 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 35% chance of gaining $180 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $60 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_liquor_180_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of thai restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $95 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 55% chance of gaining $145 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $95 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_thai_145_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about Christian topics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $45 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $195 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $45 million"]).join('. ') + '.',
                      "name": ["national-newspaper_Christian-topics_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat Hunter syndrome","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 70% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_Hunter-syndrome_115_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in West Java, Indonesia","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 65% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 35% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["railway_West-Java-Indonesia_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified corn crop with faster maturation","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $75 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $165 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $75 million"]).join('. ') + '.',
                      "name": ["GMO_corn-crop-with-faster-maturation_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 25-storey high-rise with a infilled frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 70% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_25-infilled-frame_105_240_0.7"]
                    }
                  ],
                  "randomize_order": false
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "naive"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 10){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": function() {
        preamble_awareness = '<div><p>Below is a description of project ' +
        jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0] +
        ' of 20.</p><p>Indicate below whether you would invest in the project:</p></div>'
        return preamble_awareness
        },
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an onshore location in Houston, US in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["oil-well_onshore-Houston-US_125_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current personal computer market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 60% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["microchip_personal-computer_125_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their hip hop music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $50 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 35% chance of gaining $190 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $50 million"]).join('. ') + '.',
                      "name": ["record-deal_hip-hop_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a motorbike export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $55 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 40% chance of gaining $185 million (the forecasted revenue minus the cost amount) and a 60% chance of losing $55 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_motorbike_185_240_0.4"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of italian restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $85 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 45% chance of gaining $155 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $85 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_italian_155_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about electronics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["national-newspaper_electronics_175_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat leukaemia","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 60% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_leukaemia_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Guangdong, China","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $120 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 60% chance of gaining $120 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $120 million"]).join('. ') + '.',
                      "name": ["railway_Guangdong-China_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified potato crop enriched with Vitamin A","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["GMO_potato-crop-enriched-with-Vitamin-A_175_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 10-storey high-rise with a coupled wall structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $140 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 75% chance of gaining $100 million (the forecasted revenue minus the cost amount) and a 25% chance of losing $140 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_10-coupled-wall_100_240_0.75"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an offshore location in Kuala Lumpur, Malaysia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["oil-well_offshore-Kuala-Lumpur-Malaysia_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current smartphone market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $90 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 45% chance of gaining $150 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $90 million"]).join('. ') + '.',
                      "name": ["microchip_smartphone_150_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their classical music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 55% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["record-deal_classical_115_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a wheat export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $60 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 35% chance of gaining $180 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $60 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_wheat_180_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of burger restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $95 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 55% chance of gaining $145 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $95 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_burger_145_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about politics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $45 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $195 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $45 million"]).join('. ') + '.',
                      "name": ["national-newspaper_politics_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat anaemia","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 70% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_anaemia_115_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Uttar Pradesh, India","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 65% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 35% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["railway_Uttar-Pradesh-India_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified tomato crop that induces a Hepatitis B immune response","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $75 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $165 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $75 million"]).join('. ') + '.',
                      "name": ["GMO_tomato-crop-that-induces-a-Hepatitis-B-immune-response_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 15-storey high-rise with a flat plate and flat slab structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 70% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_15-flat-plate-and-flat-slab_105_240_0.7"]
                    }
                  ],
                  "randomize_order": false
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "aware"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 1){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": function() {
        preamble_awareness = '<div><p>Below is a description of project ' +
        jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0] +
        ' of 20.</p><p>Indicate below whether you would invest in the project:</p></div>'
        return preamble_awareness
        },
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an onshore location in Dhahran, Saudi Arabia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["oil-well_onshore-Dhahran-Saudi-Arabia_125_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current DSLR camera market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 60% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["microchip_DSLR-camera_125_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their indie rock music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $50 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 35% chance of gaining $190 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $50 million"]).join('. ') + '.',
                      "name": ["record-deal_indie-rock_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a power tools export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $55 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 40% chance of gaining $185 million (the forecasted revenue minus the cost amount) and a 60% chance of losing $55 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_power-tools_185_240_0.4"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of chinese restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $85 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 45% chance of gaining $155 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $85 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_chinese_155_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about business","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["national-newspaper_business_175_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat immune dysregulation","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 60% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_immune-dysregulation_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Punjab, Pakistan","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $120 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 60% chance of gaining $120 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $120 million"]).join('. ') + '.',
                      "name": ["railway_Punjab-Pakistan_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified animal feed with enzymes to enhance digestion","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["GMO_animal-feed-with-enzymes-to-enhance-digestion_175_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 30-storey high-rise with a braced frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $140 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 75% chance of gaining $100 million (the forecasted revenue minus the cost amount) and a 25% chance of losing $140 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_30-braced-frame_100_240_0.75"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an onshore location in Stavanger, Norway in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["oil-well_onshore-Stavanger-Norway_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current military communication market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $90 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 45% chance of gaining $150 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $90 million"]).join('. ') + '.',
                      "name": ["microchip_military-communication_150_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their pop music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 55% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["record-deal_pop_115_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a artwork export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $60 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 35% chance of gaining $180 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $60 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_artwork_180_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of sushi restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $95 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 55% chance of gaining $145 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $95 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_sushi_145_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about sport","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $45 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $195 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $45 million"]).join('. ') + '.',
                      "name": ["national-newspaper_sport_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat pneumonia","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 70% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_pneumonia_115_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Kano State, Nigera","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 65% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 35% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["railway_Kano-State-Nigera_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified insect resistant persimmon","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $75 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $165 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $75 million"]).join('. ') + '.',
                      "name": ["GMO_insect-resistant-persimmon_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 40-storey high-rise with a wall-frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 70% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_40-wall-frame_105_240_0.7"]
                    }
                  ],
                  "randomize_order": false
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "aware"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 2){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": function() {
        preamble_awareness = '<div><p>Below is a description of project ' +
        jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0] +
        ' of 20.</p><p>Indicate below whether you would invest in the project:</p></div>'
        return preamble_awareness
        },
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an offshore location in Calgary, Canada in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["oil-well_offshore-Calgary-Canada_125_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current aerospace market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 60% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["microchip_aerospace_125_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their folk music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $50 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 35% chance of gaining $190 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $50 million"]).join('. ') + '.',
                      "name": ["record-deal_folk_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a steel export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $55 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 40% chance of gaining $185 million (the forecasted revenue minus the cost amount) and a 60% chance of losing $55 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_steel_185_240_0.4"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of greek restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $85 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 45% chance of gaining $155 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $85 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_greek_155_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about celebrity gossip","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["national-newspaper_celebrity-gossip_175_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat angina","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 60% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_angina_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Dhaka Division, Bangladesh","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $120 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 60% chance of gaining $120 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $120 million"]).join('. ') + '.',
                      "name": ["railway_Dhaka-Division-Bangladesh_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified virus resistant orange","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["GMO_virus-resistant-orange_175_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 45-storey high-rise with a core and outrigger structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $140 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 75% chance of gaining $100 million (the forecasted revenue minus the cost amount) and a 25% chance of losing $140 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_45-core-and-outrigger_100_240_0.75"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an offshore location in Abu Dhabi, UAE in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["oil-well_offshore-Abu-Dhabi-UAE_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current car controls market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $90 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 45% chance of gaining $150 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $90 million"]).join('. ') + '.',
                      "name": ["microchip_car-controls_150_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their soul music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 55% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["record-deal_soul_115_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a liquor export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $60 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 35% chance of gaining $180 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $60 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_liquor_180_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of thai restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $95 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 55% chance of gaining $145 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $95 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_thai_145_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about Christian topics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $45 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $195 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $45 million"]).join('. ') + '.',
                      "name": ["national-newspaper_Christian-topics_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat Hunter syndrome","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 70% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_Hunter-syndrome_115_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in West Java, Indonesia","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 65% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 35% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["railway_West-Java-Indonesia_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified corn crop with faster maturation","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $75 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $165 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $75 million"]).join('. ') + '.',
                      "name": ["GMO_corn-crop-with-faster-maturation_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 25-storey high-rise with a infilled frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 70% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_25-infilled-frame_105_240_0.7"]
                    }
                  ],
                  "randomize_order": false
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "aware"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 3){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": function() {
        preamble_awareness = '<div><p>Below is a description of project ' +
        jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0] +
        ' of 20.</p><p>Indicate below whether you would invest in the project:</p></div>'
        return preamble_awareness
        },
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an onshore location in Daqing, China in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["oil-well_onshore-Daqing-China_125_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current microwave market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 60% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["microchip_microwave_125_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their R&B music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $50 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 35% chance of gaining $190 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $50 million"]).join('. ') + '.',
                      "name": ["record-deal_R&B_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a kitchenware export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $55 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 40% chance of gaining $185 million (the forecasted revenue minus the cost amount) and a 60% chance of losing $55 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_kitchenware_185_240_0.4"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of mexican restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $85 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 45% chance of gaining $155 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $85 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_mexican_155_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about fashion","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["national-newspaper_fashion_175_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat Sickle-cell disease","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 60% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_Sickle-cell-disease_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in California, USA","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $120 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 60% chance of gaining $120 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $120 million"]).join('. ') + '.',
                      "name": ["railway_California-USA_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified trout with increased growth rate","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["GMO_trout-with-increased-growth-rate_175_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 20-storey high-rise with a rigid frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $140 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 75% chance of gaining $100 million (the forecasted revenue minus the cost amount) and a 25% chance of losing $140 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_20-rigid-frame_100_240_0.75"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an onshore location in Stavanger, Norway in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["oil-well_onshore-Stavanger-Norway_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current military communication market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $90 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 45% chance of gaining $150 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $90 million"]).join('. ') + '.',
                      "name": ["microchip_military-communication_150_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their pop music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 55% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["record-deal_pop_115_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a artwork export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $60 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 35% chance of gaining $180 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $60 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_artwork_180_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of sushi restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $95 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 55% chance of gaining $145 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $95 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_sushi_145_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about sport","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $45 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $195 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $45 million"]).join('. ') + '.',
                      "name": ["national-newspaper_sport_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat pneumonia","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 70% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_pneumonia_115_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Kano State, Nigera","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 65% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 35% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["railway_Kano-State-Nigera_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified insect resistant persimmon","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $75 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $165 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $75 million"]).join('. ') + '.',
                      "name": ["GMO_insect-resistant-persimmon_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 40-storey high-rise with a wall-frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 70% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_40-wall-frame_105_240_0.7"]
                    }
                  ],
                  "randomize_order": false
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "aware"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 4){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": function() {
        preamble_awareness = '<div><p>Below is a description of project ' +
        jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0] +
        ' of 20.</p><p>Indicate below whether you would invest in the project:</p></div>'
        return preamble_awareness
        },
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an onshore location in Daqing, China in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["oil-well_onshore-Daqing-China_125_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current microwave market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 60% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["microchip_microwave_125_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their R&B music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $50 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 35% chance of gaining $190 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $50 million"]).join('. ') + '.',
                      "name": ["record-deal_R&B_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a kitchenware export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $55 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 40% chance of gaining $185 million (the forecasted revenue minus the cost amount) and a 60% chance of losing $55 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_kitchenware_185_240_0.4"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of mexican restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $85 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 45% chance of gaining $155 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $85 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_mexican_155_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about fashion","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["national-newspaper_fashion_175_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat Sickle-cell disease","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 60% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_Sickle-cell-disease_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in California, USA","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $120 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 60% chance of gaining $120 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $120 million"]).join('. ') + '.',
                      "name": ["railway_California-USA_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified trout with increased growth rate","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["GMO_trout-with-increased-growth-rate_175_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 20-storey high-rise with a rigid frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $140 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 75% chance of gaining $100 million (the forecasted revenue minus the cost amount) and a 25% chance of losing $140 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_20-rigid-frame_100_240_0.75"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an offshore location in Kuala Lumpur, Malaysia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["oil-well_offshore-Kuala-Lumpur-Malaysia_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current smartphone market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $90 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 45% chance of gaining $150 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $90 million"]).join('. ') + '.',
                      "name": ["microchip_smartphone_150_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their classical music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 55% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["record-deal_classical_115_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a wheat export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $60 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 35% chance of gaining $180 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $60 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_wheat_180_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of burger restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $95 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 55% chance of gaining $145 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $95 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_burger_145_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about politics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $45 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $195 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $45 million"]).join('. ') + '.',
                      "name": ["national-newspaper_politics_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat anaemia","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 70% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_anaemia_115_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Uttar Pradesh, India","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 65% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 35% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["railway_Uttar-Pradesh-India_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified tomato crop that induces a Hepatitis B immune response","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $75 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $165 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $75 million"]).join('. ') + '.',
                      "name": ["GMO_tomato-crop-that-induces-a-Hepatitis-B-immune-response_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 15-storey high-rise with a flat plate and flat slab structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 70% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_15-flat-plate-and-flat-slab_105_240_0.7"]
                    }
                  ],
                  "randomize_order": false
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "aware"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 5){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": function() {
        preamble_awareness = '<div><p>Below is a description of project ' +
        jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0] +
        ' of 20.</p><p>Indicate below whether you would invest in the project:</p></div>'
        return preamble_awareness
        },
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an offshore location in Abu Dhabi, UAE in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["oil-well_offshore-Abu-Dhabi-UAE_125_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current car controls market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 60% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["microchip_car-controls_125_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their soul music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $50 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 35% chance of gaining $190 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $50 million"]).join('. ') + '.',
                      "name": ["record-deal_soul_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a liquor export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $55 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 40% chance of gaining $185 million (the forecasted revenue minus the cost amount) and a 60% chance of losing $55 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_liquor_185_240_0.4"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of thai restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $85 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 45% chance of gaining $155 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $85 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_thai_155_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about Christian topics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["national-newspaper_Christian-topics_175_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat Hunter syndrome","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 60% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_Hunter-syndrome_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in West Java, Indonesia","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $120 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 60% chance of gaining $120 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $120 million"]).join('. ') + '.',
                      "name": ["railway_West-Java-Indonesia_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified corn crop with faster maturation","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["GMO_corn-crop-with-faster-maturation_175_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 25-storey high-rise with a infilled frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $140 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 75% chance of gaining $100 million (the forecasted revenue minus the cost amount) and a 25% chance of losing $140 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_25-infilled-frame_100_240_0.75"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an onshore location in Daqing, China in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["oil-well_onshore-Daqing-China_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current microwave market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $90 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 45% chance of gaining $150 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $90 million"]).join('. ') + '.',
                      "name": ["microchip_microwave_150_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their R&B music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 55% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["record-deal_R&B_115_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a kitchenware export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $60 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 35% chance of gaining $180 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $60 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_kitchenware_180_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of mexican restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $95 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 55% chance of gaining $145 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $95 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_mexican_145_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about fashion","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $45 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $195 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $45 million"]).join('. ') + '.',
                      "name": ["national-newspaper_fashion_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat Sickle-cell disease","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 70% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_Sickle-cell-disease_115_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in California, USA","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 65% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 35% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["railway_California-USA_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified trout with increased growth rate","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $75 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $165 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $75 million"]).join('. ') + '.',
                      "name": ["GMO_trout-with-increased-growth-rate_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 20-storey high-rise with a rigid frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 70% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_20-rigid-frame_105_240_0.7"]
                    }
                  ],
                  "randomize_order": false
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "aware"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 6){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": function() {
        preamble_awareness = '<div><p>Below is a description of project ' +
        jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0] +
        ' of 20.</p><p>Indicate below whether you would invest in the project:</p></div>'
        return preamble_awareness
        },
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an onshore location in Dhahran, Saudi Arabia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["oil-well_onshore-Dhahran-Saudi-Arabia_125_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current DSLR camera market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 60% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["microchip_DSLR-camera_125_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their indie rock music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $50 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 35% chance of gaining $190 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $50 million"]).join('. ') + '.',
                      "name": ["record-deal_indie-rock_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a power tools export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $55 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 40% chance of gaining $185 million (the forecasted revenue minus the cost amount) and a 60% chance of losing $55 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_power-tools_185_240_0.4"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of chinese restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $85 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 45% chance of gaining $155 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $85 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_chinese_155_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about business","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["national-newspaper_business_175_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat immune dysregulation","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 60% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_immune-dysregulation_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Punjab, Pakistan","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $120 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 60% chance of gaining $120 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $120 million"]).join('. ') + '.',
                      "name": ["railway_Punjab-Pakistan_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified animal feed with enzymes to enhance digestion","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["GMO_animal-feed-with-enzymes-to-enhance-digestion_175_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 30-storey high-rise with a braced frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $140 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 75% chance of gaining $100 million (the forecasted revenue minus the cost amount) and a 25% chance of losing $140 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_30-braced-frame_100_240_0.75"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an offshore location in Basra, Iraq in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["oil-well_offshore-Basra-Iraq_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current gaming console market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $90 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 45% chance of gaining $150 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $90 million"]).join('. ') + '.',
                      "name": ["microchip_gaming-console_150_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their heavy metal music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 55% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["record-deal_heavy-metal_115_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a wrist watch export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $60 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 35% chance of gaining $180 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $60 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_wrist-watch_180_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of barbeque restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $95 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 55% chance of gaining $145 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $95 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_barbeque_145_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about science","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $45 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $195 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $45 million"]).join('. ') + '.',
                      "name": ["national-newspaper_science_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat hypertension","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 70% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_hypertension_115_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Minas Gerais, Brazil","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 65% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 35% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["railway_Minas-Gerais-Brazil_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified herbicide tolerant melon","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $75 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $165 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $75 million"]).join('. ') + '.',
                      "name": ["GMO_herbicide-tolerant-melon_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 35-storey high-rise with a shear wall structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 70% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_35-shear-wall_105_240_0.7"]
                    }
                  ],
                  "randomize_order": false
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "aware"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 7){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": function() {
        preamble_awareness = '<div><p>Below is a description of project ' +
        jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0] +
        ' of 20.</p><p>Indicate below whether you would invest in the project:</p></div>'
        return preamble_awareness
        },
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an onshore location in Houston, US in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["oil-well_onshore-Houston-US_125_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current personal computer market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 60% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["microchip_personal-computer_125_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their hip hop music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $50 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 35% chance of gaining $190 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $50 million"]).join('. ') + '.',
                      "name": ["record-deal_hip-hop_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a motorbike export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $55 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 40% chance of gaining $185 million (the forecasted revenue minus the cost amount) and a 60% chance of losing $55 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_motorbike_185_240_0.4"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of italian restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $85 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 45% chance of gaining $155 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $85 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_italian_155_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about electronics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["national-newspaper_electronics_175_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat leukaemia","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 60% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_leukaemia_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Guangdong, China","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $120 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 60% chance of gaining $120 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $120 million"]).join('. ') + '.',
                      "name": ["railway_Guangdong-China_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified potato crop enriched with Vitamin A","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["GMO_potato-crop-enriched-with-Vitamin-A_175_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 10-storey high-rise with a coupled wall structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $140 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 75% chance of gaining $100 million (the forecasted revenue minus the cost amount) and a 25% chance of losing $140 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_10-coupled-wall_100_240_0.75"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an offshore location in Calgary, Canada in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["oil-well_offshore-Calgary-Canada_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current aerospace market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $90 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 45% chance of gaining $150 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $90 million"]).join('. ') + '.',
                      "name": ["microchip_aerospace_150_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their folk music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 55% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["record-deal_folk_115_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a steel export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $60 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 35% chance of gaining $180 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $60 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_steel_180_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of greek restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $95 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 55% chance of gaining $145 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $95 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_greek_145_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about celebrity gossip","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $45 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $195 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $45 million"]).join('. ') + '.',
                      "name": ["national-newspaper_celebrity-gossip_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat angina","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 70% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_angina_115_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Dhaka Division, Bangladesh","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 65% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 35% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["railway_Dhaka-Division-Bangladesh_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified virus resistant orange","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $75 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $165 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $75 million"]).join('. ') + '.',
                      "name": ["GMO_virus-resistant-orange_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 45-storey high-rise with a core and outrigger structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 70% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_45-core-and-outrigger_105_240_0.7"]
                    }
                  ],
                  "randomize_order": false
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "aware"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 8){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": function() {
        preamble_awareness = '<div><p>Below is a description of project ' +
        jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0] +
        ' of 20.</p><p>Indicate below whether you would invest in the project:</p></div>'
        return preamble_awareness
        },
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an onshore location in Daqing, China in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["oil-well_onshore-Daqing-China_125_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current microwave market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 60% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["microchip_microwave_125_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their R&B music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $50 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 35% chance of gaining $190 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $50 million"]).join('. ') + '.',
                      "name": ["record-deal_R&B_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a kitchenware export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $55 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 40% chance of gaining $185 million (the forecasted revenue minus the cost amount) and a 60% chance of losing $55 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_kitchenware_185_240_0.4"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of mexican restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $85 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 45% chance of gaining $155 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $85 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_mexican_155_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about fashion","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["national-newspaper_fashion_175_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat Sickle-cell disease","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 60% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_Sickle-cell-disease_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in California, USA","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $120 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 60% chance of gaining $120 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $120 million"]).join('. ') + '.',
                      "name": ["railway_California-USA_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified trout with increased growth rate","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["GMO_trout-with-increased-growth-rate_175_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 20-storey high-rise with a rigid frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $140 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 75% chance of gaining $100 million (the forecasted revenue minus the cost amount) and a 25% chance of losing $140 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_20-rigid-frame_100_240_0.75"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an offshore location in Basra, Iraq in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["oil-well_offshore-Basra-Iraq_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current gaming console market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $90 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 45% chance of gaining $150 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $90 million"]).join('. ') + '.',
                      "name": ["microchip_gaming-console_150_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their heavy metal music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 55% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["record-deal_heavy-metal_115_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a wrist watch export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $60 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 35% chance of gaining $180 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $60 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_wrist-watch_180_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of barbeque restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $95 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 55% chance of gaining $145 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $95 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_barbeque_145_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about science","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $45 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $195 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $45 million"]).join('. ') + '.',
                      "name": ["national-newspaper_science_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat hypertension","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 70% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_hypertension_115_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Minas Gerais, Brazil","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 65% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 35% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["railway_Minas-Gerais-Brazil_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified herbicide tolerant melon","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $75 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $165 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $75 million"]).join('. ') + '.',
                      "name": ["GMO_herbicide-tolerant-melon_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 35-storey high-rise with a shear wall structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 70% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_35-shear-wall_105_240_0.7"]
                    }
                  ],
                  "randomize_order": false
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "aware"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 9){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": function() {
        preamble_awareness = '<div><p>Below is a description of project ' +
        jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0] +
        ' of 20.</p><p>Indicate below whether you would invest in the project:</p></div>'
        return preamble_awareness
        },
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an offshore location in Aberdeen, UK in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["oil-well_offshore-Aberdeen-UK_125_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current GPS tracking device market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $115 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 60% chance of gaining $125 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $115 million"]).join('. ') + '.',
                      "name": ["microchip_GPS-tracking-device_125_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their latin music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $50 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 35% chance of gaining $190 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $50 million"]).join('. ') + '.',
                      "name": ["record-deal_latin_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a wool export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $55 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 40% chance of gaining $185 million (the forecasted revenue minus the cost amount) and a 60% chance of losing $55 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_wool_185_240_0.4"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of buffet restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $85 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 45% chance of gaining $155 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $85 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_buffet_155_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about foreign affairs","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["national-newspaper_foreign-affairs_175_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat Chronic kidney disease","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 60% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_Chronic-kidney-disease_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in Oaxaca, Mexico","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $120 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 60% chance of gaining $120 million (the forecasted revenue minus the cost amount) and a 40% chance of losing $120 million"]).join('. ') + '.',
                      "name": ["railway_Oaxaca-Mexico_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified bacteria for clean fuel development","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $65 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $175 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $65 million"]).join('. ') + '.',
                      "name": ["GMO_bacteria-for-clean-fuel-development_175_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 55-storey high-rise with a tube structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $140 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 75% chance of gaining $100 million (the forecasted revenue minus the cost amount) and a 25% chance of losing $140 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_55-tube_100_240_0.75"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Refinera is a business in your company that proposes to construct an oil well project. Specifically, they want to establish an exploration site at an offshore location in Abu Dhabi, UAE in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $105 million (the loss amount)","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. The estimate for the anticipated chance of gain is based on a geological and seismic study of the site, and an analysis of previous similar sites","To summarise this investment, there is a 55% chance of gaining $135 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $105 million"]).join('. ') + '.',
                      "name": ["oil-well_offshore-Abu-Dhabi-UAE_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Microxy is a business in your company that proposes to construct a microchip project. Specifically, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current car controls market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $90 million (the loss amount)","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. The estimate for the anticipated chance of gain is based on an electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs","To summarise this investment, there is a 45% chance of gaining $150 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $90 million"]).join('. ') + '.',
                      "name": ["microchip_car-controls_150_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Vital Records is a business in your company that proposes to construct a record deal project. Specifically, they want to sign a new recording artist for their soul music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted record sales eventuate. The estimate for the anticipated chance of gain is based on a study of the distribution market, and an analysis of the record sales of previous similar recording artists","To summarise this investment, there is a 55% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["record-deal_soul_115_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Logivia is a business in your company that proposes to construct a shipping logistics project. Specifically, they want to develop a new shipping route for a liquor export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $60 million (the loss amount)","The company would make $240 million if the forecasted exporter demand eventuates. The estimate for the anticipated chance of gain is based on a study of freight risks, and an analysis of the demand of previous similar export markets","To summarise this investment, there is a 35% chance of gaining $180 million (the forecasted revenue minus the cost amount) and a 65% chance of losing $60 million"]).join('. ') + '.',
                      "name": ["shipping-logistics_liquor_180_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Savoro is a business in your company that proposes to construct a restaurant chain project. Specifically, they want to develop a new franchise of thai restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $95 million (the loss amount)","The company would make $240 million if the forecasted customer attendance eventuates. The estimate for the anticipated chance of gain is based on a study of culinary preference trends, and an analysis of the demand of previous similar restaurants","To summarise this investment, there is a 55% chance of gaining $145 million (the forecasted revenue minus the cost amount) and a 45% chance of losing $95 million"]).join('. ') + '.',
                      "name": ["restaurant-chain_thai_145_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Grown Media is a business in your company that proposes to construct a national newspaper project. Specifically, they want to develop a new nationally-distributed newspaper about Christian topics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $45 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers","To summarise this investment, there is a 30% chance of gaining $195 million (the forecasted revenue minus the cost amount) and a 70% chance of losing $45 million"]).join('. ') + '.',
                      "name": ["national-newspaper_Christian-topics_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. Specifically, they want to develop a new pharmaceutical drug to help treat Hunter syndrome","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $125 million (the loss amount)","The company would make $240 million if the forecasted sales eventuate. The estimate for the anticipated chance of gain is based on a biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds","To summarise this investment, there is a 70% chance of gaining $115 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $125 million"]).join('. ') + '.',
                      "name": ["pharmaceutical_Hunter-syndrome_115_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["FreightCog is a business in your company that proposes to construct a railway project. Specifically, they want to develop a new railway line in West Java, Indonesia","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. The estimate for the anticipated chance of gain is based on a study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines","To summarise this investment, there is a 65% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 35% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["railway_West-Java-Indonesia_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Evogenic is a business in your company that proposes to construct a GMO project. Specifically, they want to develop a new genetically modified corn crop with faster maturation","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $75 million (the loss amount)","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. The estimate for the anticipated chance of gain is based on a study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs","To summarise this investment, there is a 45% chance of gaining $165 million (the forecasted revenue minus the cost amount) and a 55% chance of losing $75 million"]).join('. ') + '.',
                      "name": ["GMO_corn-crop-with-faster-maturation_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.shuffle(["Erectic is a business in your company that proposes to construct a high-rise construction project. Specifically, they want to develop a new 25-storey high-rise with a infilled frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $135 million (the loss amount)","The company would make $240 million if the forecasted residential and commercial property sales eventuate. The estimate for the anticipated chance of gain is based on a study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties","To summarise this investment, there is a 70% chance of gaining $105 million (the forecasted revenue minus the cost amount) and a 30% chance of losing $135 million"]).join('. ') + '.',
                      "name": ["high-rise-construction_25-infilled-frame_105_240_0.7"]
                    }
                  ],
                  "randomize_order": false
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "aware"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 10){
        return true;
      } else {
        return false;
      }
    }
        }
      ]
    },
    {
      "timeline": [
        {
          "type": ["survey-html-form"],
          "html": ["<p>\n  <p>\n    <label for=\"project_expectation\">At the begining of the experiment, before you saw any projects, how many projects did you expect to see?<\/label>\n  <\/p>\n  \n  <input type=\"number\" id=\"project_expectation\" name=\"project_expectation\" min=\"0\" max=\"100\" required style=\"width:70px\"/>\n  project(s)\n<\/p>"],
          "data": {
            "stage": ["project_expectation"]
          }
        },
        {
          "type": ["survey-html-form"],
          "html": ["<p>\n  <p>\n    <label for=\"project_number\">In total, how many projects did you just see?<\/label>\n  <\/p>\n  \n  <input type=\"number\" id=\"project_number\" name=\"project_number\" min=\"0\" max=\"40\" required style=\"width:70px\"/>\n  projects\n<\/p>"],
          "data": {
            "stage": ["project_number"]
          }
        },
        {
          "timeline": [
            {
              "type": ["html-button-response"],
              "stimulus": ["<p>\n  <strong>Consider all the projects you saw. If you had to choose between investing in all of them, or investing in none of them, which would you choose?<\/strong>\n<\/p>"],
              "choices": ["Invest in all of the projects", "Invest in none of the projects"],
              "margin_vertical": ["0px"],
              "margin_horizontal": ["8px"],
              "response_ends_trial": true,
              "post_trial_gap": [0],
              "data": {
                "stage": ["portfolio_binary"]
              }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.distribution == "absent"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "type": ["survey-html-form"],
              "html": ["<p>\n  <p>\n    <label for=\"portfolio_number\">\n      <p>\n        <strong>\n          The total number of projects you were shown is \n          20\n          . If you could choose to invest in a certain number of those \n          20\n           projects, how many would you invest in?\n        <\/strong>\n      <\/p>\n    <\/label>\n  <\/p>\n  \n  <input type=\"number\" id=\"portfolio_number\" name=\"portfolio_number\" min=\"0\" max=\"20\" required style=\"width:70px\"/>\n  projects\n<\/p>"],
              "data": {
                "stage": ["portfolio_number"]
              }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.distribution == "absent"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "type": ["html-button-response"],
          "stimulus": ["<div>\n  <p>Press below to complete the experiment.<\/p>\n  <p>The next page will be a blank white screen. It will take approximately 10 seconds to save your data, after which you will be automatically redirected back to Prolific. Please do not exit until you have been redirected back to Prolific.<\/p>\n  <p>Thank you!<\/p>\n<\/div>"],
          "choices": ["End experiment"],
          "margin_vertical": ["0px"],
          "margin_horizontal": ["8px"],
          "response_ends_trial": true,
          "post_trial_gap": [0],
          "data": {
            "stage": ["end"]
          }
        }
      ]
    }
  ]
};

jsPsych.init(
{
  "timeline": [timeline],
  "experiment_width": [750],
  "preload_images": ["resource/image/gambles_plot_experiment4.png"],
  "on_finish": {}
}
);
