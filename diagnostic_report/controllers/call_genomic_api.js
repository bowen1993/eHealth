var requestify = require('requestify');
var configs = require('./configs.js')


var doGet = function(url, access_token, res){
	console.log('geting');
  requestify.get(url, {
    headers :{'Accept': 'application/json',
              'Authorization': 'Bearer ' + access_token}
  }).then(function(response){
		console.log(response);
    res.json(response.getBody());
  });
}

var doPost = function(url, data, access_token, res){
  requestify.post(url, data, {
    headers:{
      'Accept' : 'application/json',
      'Authorization': 'Bearer ' + access_token
    }
  }).then(function(response){
    res.json(response.getBody());
  });
}

var doPut = function(url, data, access_token, res){
  requestify.put(url, data,{
    headers:{
      'Accept' : 'application/json',
      'Authorization': 'Bearer ' + access_token
    }
  }).then(function(response){
    res.json(response.getBody());
  });
}


//function for test purpose
/*
function call_api(data_type){
	if ( data_type == '/Observation' ){
		var json_res = {
					  "resourceType": "Observation",
					  "id": "example",
					  "text": {
					    "fhir_comments": [
					      "    the mandatory quality flags:    "
					    ],
					    "status": "generated",
					    "div": "<div><p><b>Generated Narrative with Details</b></p><p><b>id</b>: example</p><p><b>status</b>: final</p><p><b>category</b>: Vital Signs <span>(Details : {http://hl7.org/fhir/observation-category code 'vital-signs' = 'Vital Signs', given as 'Vital Signs'})</span></p><p><b>code</b>: Weight Measured <span>(Details : {LOINC code '3141-9' = 'Body weight Measured', given as 'Weight Measured'}; {SNOMED CT code '27113001' = 'Body weight (observable entity)', given as 'Body weight'}; {http://acme.org/devices/clinical-codes code 'body-weight' = 'body-weight', given as 'Body Weight'})</span></p><p><b>subject</b>: <a>Patient/example</a></p><p><b>encounter</b>: <a>Encounter/example</a></p><p><b>value</b>: 185 lbs<span> (Details: http://unitsofmeasure.org code [lb_av] = '[lb_av]')</span></p></div>"
					  },
					  "status": "final",
					  "category": {
					    "fhir_comments": [
					      "   category code is A code that classifies the the general type of observation being made. This is used for searching, sorting and display purposes.  "
					    ],
					    "coding": [
					      {
					        "system": "http://hl7.org/fhir/observation-category",
					        "code": "vital-signs",
					        "display": "Vital Signs"
					      }
					    ]
					  },
					  "code": {
					    "fhir_comments": [
					      "   \n    Observations are often coded in multiple code systems.\n      - Loinc provides a very specific code (though not usefully more specific in this particular case)\n      - snomed provides a clinically relevant code that is usually less granular than LOINC\n      - the source system provides its own code, which may be less or more granular than LOINC\n     "
					    ],
					    "coding": [
					      {
					        "fhir_comments": [
					          "    LOINC - always recommended to have a LOINC code    "
					        ],
					        "system": "http://loinc.org",
					        "code": "3141-9",
					        "display": "Weight Measured"
					      },
					      {
					        "fhir_comments": [
					          "    SNOMED CT Codes - becoming more common    "
					        ],
					        "system": "http://snomed.info/sct",
					        "code": "27113001",
					        "display": "Body weight"
					      },
					      {
					        "fhir_comments": [
					          "    Also, a local code specific to the source system    "
					        ],
					        "system": "http://acme.org/devices/clinical-codes",
					        "code": "body-weight",
					        "display": "Body Weight"
					      }
					    ]
					  },
					  "subject": {
					    "reference": "Patient/example"
					  },
					  "encounter": {
					    "reference": "Encounter/example"
					  },
					  "valueQuantity": {
					    "fhir_comments": [
					      "    In FHIR, units may be represented twice. Once in the\n    agreed human representation, and once in a coded form.\n    Both is best, since it's not always possible to infer\n    one from the other in code.\n\n    When a computable unit is provided, UCUM (http://unitsofmeasure.org)\n    is always preferred, but it doesn't provide notional units (such as\n    \"tablet\"), etc. For these, something else is required (e.g. Snomed-CT)\n      "
					    ],
					    "value": 185,
					    "unit": "lbs",
					    "system": "http://unitsofmeasure.org",
					    "code": "[lb_av]"
					  }
					};
		return json_res;
	}else if ( data_type == '/DiagnosticReport' ){
		var json_res = {
					  "resourceType": "DiagnosticReport",
					  "id": "dg1",
					  "text": {
					    "status": "generated",
					    "div": "<div><p><b>Generated Narrative with Details</b></p><p><b>id</b>: dg1</p><p><b>contained</b>: , , , , </p><p><b>status</b>: final</p><p><b>category</b>: Laboratory test <span>(Details : {SNOMED CT code '15220000' = 'Laboratory test (procedure)', given as 'Laboratory test'}; {http://hl7.org/fhir/v2/0074 code 'LAB' = 'Laboratory)</span></p><p><b>code</b>: ABCB4 gene mutation analysis <span>(Details : {LOINC code '49874-1' = 'ABCB4 gene mutation analysis in Blood or Tissue by Molecular genetics method Narrative', given as 'ABCB4 gene mutation analysis'})</span></p><p><b>subject</b>: <a>Molecular Lab Patient ID: HOSP-23456</a></p><p><b>effective</b>: 2014-3-4 8:30:00</p><p><b>issued</b>: 2014-5-16 10:28:00</p><p><b>performer</b>: <a>Molecular Diagnostic Laboratory</a></p><p><b>specimen</b>: <a>Molecular Specimen ID: MLD45-Z4-1234</a></p><p><b>result</b>: </p><ul><li>Genetic analysis master panel for ABCB4 -variant1. Generated Summary: id: od-1; Extensions: todo, Extensions: todo, Extensions: todo, Extensions: todo; status: final; ABCB4 gene mutation analysis <span>(Details : {LOINC code '49874-1' = 'ABCB4 gene mutation analysis in Blood or Tissue by Molecular genetics method Narrative', given as 'ABCB4 gene mutation analysis'})</span>; positive <span>(Details : {http://hl7.org/fhir/v2/0078 code 'POS' = 'Positive)</span></li><li>Genetic analysis master panel for ABCB4 -variant2. Generated Summary: id: od-2; Extensions: todo, Extensions: todo, Extensions: todo, Extensions: todo; status: final; ABCB4 gene mutation analysis <span>(Details : {LOINC code '49874-1' = 'ABCB4 gene mutation analysis in Blood or Tissue by Molecular genetics method Narrative', given as 'ABCB4 gene mutation analysis'})</span>; positive <span>(Details : {http://hl7.org/fhir/v2/0078 code 'POS' = 'Positive)</span></li><li>Genetic analysis master panel for ABCB4 -variant3. Generated Summary: id: od-3; Extensions: todo, Extensions: todo, Extensions: todo, Extensions: todo; status: final; ABCB4 gene mutation analysis <span>(Details : {LOINC code '49874-1' = 'ABCB4 gene mutation analysis in Blood or Tissue by Molecular genetics method Narrative', given as 'ABCB4 gene mutation analysis'})</span>; positive <span>(Details : {http://hl7.org/fhir/v2/0078 code 'POS' = 'Positive)</span></li><li>Genetic analysis master panel for ABCB4 -variant4. Generated Summary: id: od-4; Extensions: todo, Extensions: todo, Extensions: todo, Extensions: todo; status: final; ABCB4 gene mutation analysis <span>(Details : {LOINC code '49874-1' = 'ABCB4 gene mutation analysis in Blood or Tissue by Molecular genetics method Narrative', given as 'ABCB4 gene mutation analysis'})</span>; positive <span>(Details : {http://hl7.org/fhir/v2/0078 code 'POS' = 'Positive)</span></li></ul></div>"
					  },
					  "contained": [
					    {
					      "resourceType": "Condition",
					      "id": "c1",
					      "patient": {
					        "reference": "Patient/p1"
					      },
					      "code": {
					        "coding": [
					          {
					            "system": "http://snomed.info/sct",
					            "code": "254626006"
					          }
					        ],
					        "text": "Adenocarcinoma of lung "
					      },
					      "category": {
					        "coding": [
					          {
					            "system": "http://hl7.org/fhir/condition-category",
					            "code": "finding",
					            "display": "Finding"
					          }
					        ]
					      },
					      "verificationStatus": "provisional"
					    },
					    {
					      "resourceType": "Observation",
					      "id": "od-1",
					      "extension": [
					        {
					          "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsSequence",
					          "valueReference": {
					            "reference": "Sequence/seq2-1"
					          }
					        },
					        {
					          "extension": [
					            {
					              "url": "genomeBuild",
					              "valueCodeableConcept": {
					                "text": "GRCh 38"
					              }
					            },
					            {
					              "url": "name",
					              "valueCodeableConcept": {
					                "text": "c.2708T>C"
					              }
					            }
					          ],
					          "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsVariationHGVS"
					        },
					        {
					          "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsGene",
					          "valueCodeableConcept": {
					            "coding": [
					              {
					                "system": "http://www.genenames.org",
					                "code": "5244",
					                "display": "ABCB4"
					              }
					            ]
					          }
					        },
					        {
					          "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsRegion",
					          "valueCodeableConcept": {
					            "text": "Exon 23"
					          }
					        }
					      ],
					      "status": "final",
					      "code": {
					        "coding": [
					          {
					            "system": "http://loinc.org",
					            "code": "49874-1",
					            "display": "ABCB4 gene mutation analysis"
					          }
					        ]
					      },
					      "interpretation": {
					        "coding": [
					          {
					            "system": "http://hl7.org/fhir/v2/0078",
					            "code": "POS"
					          }
					        ],
					        "text": "positive"
					      },
					      "component": [
					        {
					          "code": {
					            "coding": [
					              {
					                "system": "http://loinc.org",
					                "code": "53037-8",
					                "display": "Genetic disease sequence variation interpretation"
					              }
					            ]
					          },
					          "valueCodeableConcept": {
					            "coding": [
					              {
					                "code": "LA6682-4",
					                "display": "Unknown significance"
					              }
					            ]
					          }
					        }
					      ]
					    },
					    {
					      "resourceType": "Observation",
					      "id": "od-2",
					      "extension": [
					        {
					          "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsSequence",
					          "valueReference": {
					            "reference": "Sequence/seq2-2"
					          }
					        },
					        {
					          "extension": [
					            {
					              "url": "genomeBuild",
					              "valueCodeableConcept": {
					                "text": "GRCh 38"
					              }
					            },
					            {
					              "url": "name",
					              "valueCodeableConcept": {
					                "text": "c.181T>G"
					              }
					            }
					          ],
					          "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsVariationHGVS"
					        },
					        {
					          "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsGene",
					          "valueCodeableConcept": {
					            "coding": [
					              {
					                "system": "http://www.genenames.org",
					                "code": "5244",
					                "display": "ABCB4"
					              }
					            ]
					          }
					        },
					        {
					          "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsRegion",
					          "valueCodeableConcept": {
					            "text": "Exon 6"
					          }
					        }
					      ],
					      "status": "final",
					      "code": {
					        "coding": [
					          {
					            "system": "http://loinc.org",
					            "code": "49874-1",
					            "display": "ABCB4 gene mutation analysis"
					          }
					        ]
					      },
					      "interpretation": {
					        "coding": [
					          {
					            "system": "http://hl7.org/fhir/v2/0078",
					            "code": "POS"
					          }
					        ],
					        "text": "positive"
					      },
					      "component": [
					        {
					          "code": {
					            "coding": [
					              {
					                "system": "http://loinc.org",
					                "code": "53037-8",
					                "display": "Genetic disease sequence variation interpretation"
					              }
					            ]
					          },
					          "valueCodeableConcept": {
					            "coding": [
					              {
					                "code": "LA6675-8",
					                "display": "Benign"
					              }
					            ]
					          }
					        }
					      ]
					    },
					    {
					      "resourceType": "Observation",
					      "id": "od-3",
					      "extension": [
					        {
					          "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsSequence",
					          "valueReference": {
					            "reference": "Sequence/seq2-3"
					          }
					        },
					        {
					          "extension": [
					            {
					              "url": "genomeBuild",
					              "valueCodeableConcept": {
					                "text": "GRCh 38"
					              }
					            },
					            {
					              "url": "name",
					              "valueCodeableConcept": {
					                "text": "c.2211+16C>T"
					              }
					            }
					          ],
					          "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsVariationHGVS"
					        },
					        {
					          "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsGene",
					          "valueCodeableConcept": {
					            "coding": [
					              {
					                "system": "http://www.genenames.org",
					                "code": "5244",
					                "display": "ABCB4"
					              }
					            ]
					          }
					        },
					        {
					          "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsRegion",
					          "valueCodeableConcept": {
					            "text": "intron 16"
					          }
					        }
					      ],
					      "status": "final",
					      "code": {
					        "coding": [
					          {
					            "system": "http://loinc.org",
					            "code": "49874-1",
					            "display": "ABCB4 gene mutation analysis"
					          }
					        ]
					      },
					      "interpretation": {
					        "coding": [
					          {
					            "system": "http://hl7.org/fhir/v2/0078",
					            "code": "POS"
					          }
					        ],
					        "text": "positive"
					      },
					      "component": [
					        {
					          "code": {
					            "coding": [
					              {
					                "system": "http://loinc.org",
					                "code": "53037-8",
					                "display": "Genetic disease sequence variation interpretation"
					              }
					            ]
					          },
					          "valueCodeableConcept": {
					            "coding": [
					              {
					                "code": "LA6675-8",
					                "display": "Benign"
					              }
					            ]
					          }
					        }
					      ]
					    },
					    {
					      "resourceType": "Observation",
					      "id": "od-4",
					      "extension": [
					        {
					          "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsSequence",
					          "valueReference": {
					            "reference": "Sequence/seq2-4"
					          }
					        },
					        {
					          "extension": [
					            {
					              "url": "genomeBuild",
					              "valueCodeableConcept": {
					                "text": "GRCh 38"
					              }
					            },
					            {
					              "url": "name",
					              "valueCodeableConcept": {
					                "text": "c.3487-16T>C"
					              }
					            }
					          ],
					          "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsVariationHGVS"
					        },
					        {
					          "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsGene",
					          "valueCodeableConcept": {
					            "coding": [
					              {
					                "system": "http://www.genenames.org",
					                "code": "5244",
					                "display": "ABCB4"
					              }
					            ]
					          }
					        },
					        {
					          "url": "http://hl7.org/fhir/StructureDefinition/observation-geneticsRegion",
					          "valueCodeableConcept": {
					            "text": "intron 26"
					          }
					        }
					      ],
					      "status": "final",
					      "code": {
					        "coding": [
					          {
					            "system": "http://loinc.org",
					            "code": "49874-1",
					            "display": "ABCB4 gene mutation analysis"
					          }
					        ]
					      },
					      "interpretation": {
					        "coding": [
					          {
					            "system": "http://hl7.org/fhir/v2/0078",
					            "code": "POS"
					          }
					        ],
					        "text": "positive"
					      },
					      "component": [
					        {
					          "code": {
					            "coding": [
					              {
					                "system": "http://loinc.org",
					                "code": "53037-8",
					                "display": "Genetic disease sequence variation interpretation"
					              }
					            ]
					          },
					          "valueCodeableConcept": {
					            "coding": [
					              {
					                "code": "LA6675-8",
					                "display": "Benign"
					              }
					            ]
					          }
					        }
					      ]
					    }
					  ],
					  "extension": [
					    {
					      "url": "http://hl7.org/fhir/StructureDefinition/DiagnosticReport-geneticsAssessedCondition",
					      "valueReference": {
					        "reference": "#c1"
					      }
					    },
					    {
					      "extension": [
					        {
					          "url": "type",
					          "valueCodeableConcept": {
					            "coding": [
					              {
					                "system": "http://loinc.org",
					                "code": "51968-6",
					                "display": "Genetic Disease Analysis Overall Interpretation"
					              }
					            ]
					          }
					        },
					        {
					          "url": "interpretation",
					          "valueCodeableConcept": {
					            "coding": [
					              {
					                "code": "LA9663-1 ",
					                "display": "Inconclusive"
					              }
					            ]
					          }
					        }
					      ],
					      "url": "http://hl7.org/fhir/StructureDefinition/DiagnosticReport-geneticsAnalysis"
					    }
					  ],
					  "status": "final",
					  "category": {
					    "coding": [
					      {
					        "system": "http://snomed.info/sct",
					        "code": "15220000",
					        "display": "Laboratory test"
					      },
					      {
					        "system": "http://hl7.org/fhir/v2/0074",
					        "code": "LAB"
					      }
					    ]
					  },
					  "code": {
					    "coding": [
					      {
					        "system": "http://loinc.org",
					        "code": "49874-1",
					        "display": "ABCB4 gene mutation analysis"
					      }
					    ]
					  },
					  "subject": {
					    "reference": "Patient/genetics-example2",
					    "display": "Molecular Lab Patient ID: HOSP-23456"
					  },
					  "effectiveDateTime": "2014-03-04T08:30:00+11:00",
					  "issued": "2014-05-16T10:28:00+01:00",
					  "performer": {
					    "reference": "Practitioner/genetics-example2",
					    "display": "Molecular Diagnostic Laboratory"
					  },
					  "specimen": [
					    {
					      "reference": "Specimen/genetics-example2",
					      "display": "Molecular Specimen ID: MLD45-Z4-1234"
					    }
					  ],
					  "result": [
					    {
					      "reference": "#od-1",
					      "display": "Genetic analysis master panel for ABCB4 -variant1"
					    },
					    {
					      "reference": "#od-2",
					      "display": "Genetic analysis master panel for ABCB4 -variant2"
					    },
					    {
					      "reference": "#od-3",
					      "display": "Genetic analysis master panel for ABCB4 -variant3"
					    },
					    {
					      "reference": "#od-4",
					      "display": "Genetic analysis master panel for ABCB4 -variant4"
					    }
					  ]
					}
		return json_res;
	}else{
		return '';
	}
}
*/

var create = function(access_token ,data_type, data, res){
	var url = configs.api_url + '/' + data_type;
	doPost(url, data, access_token, res);
}

var update = function(access_token, data_type, data, res){
	var url = configs.api_url + '/' +data_type;
	doPut(url, data, access_token, res);
}

var search = function(access_token, data_type, res){
	console.log('in');
	var url = configs.api_url + '/' + data_type;
	console.log(url);
	doGet(url, access_token, res);
}

module.exports = {
	create:create,
	update:update,
	search:search
}
