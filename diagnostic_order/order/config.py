# OAuth2 settings for communicating with clinical server
CLINICAL = {
    'client_id': '5e3a370c-1fff-41d6-a4ef-d177c19357e7',
    'redirect_uri': 'http://localhost:8000/',
    'scopes': [
               'launch',
               'launch/patient',
               'launch/encounter',
               'patient/*.read',
               'user/*.*',
               'openid',
               'profile'
               ]
}
# OAuth2 settings for communicating with genomic server
GENOMICS = {
    'client_id': 'a230d3be-e35e-43b8-a30e-befe6b2c70ea',
    'redirect_uri': 'http://genomics-advisor.smartplatforms.org:2048/',
    'scopes': ['user/Sequence.read', 'user/Patient.read','user/Sequence.write'],
    'oauth_base': 'http://genomics-advisor.smartplatforms.org:8005/auth',
    'api_base': 'http://genomics-advisor.smartplatforms.org:8005/api'

}


# choose a secret key here:
SECRET_KEY = 'hello, world!'
GOOGLE_API_KEY = 'AIzaSyB01GeX_HiuZbHCkZ-P5hJ7yUHVkwFS07Q'

CLIENT_ID ='e29fb523-1489-47bb-b163-39b5cae866e8'
SCOPES = [
'launch',
'launch/patient',
'launch/encounter',
'patient/*.read',
'user/*.*',
'openid',
'profile']
redirect_uri = 'http://localhost:8000/'
REDIRECT_URI = 'http://localhost:8000/recv_redirect'
AUTH_BASE = 'https://authorize-dstu2.smarthealthit.org'
API_BASE = 'https://fhir-api-dstu2.smarthealthit.org'
ID_SRCRET_BASE64 = 'ZTI5ZmI1MjMtMTQ4OS00N2JiLWIxNjMtMzliNWNhZTg2NmU4OkFMZHFlclpDRzNPalNibUE0SUFFRXNDNWpvdDliUnFqbmJrZ04tek1oUDhtWFNTakpqUExsQ3pwa2dfN09BVXg2UVNqU2ZSZXpzTE8xbmpIcEs5ZlJkZw=='

testJson = {
  "resourceType": "DiagnosticOrder",
  "id": "1234",
  "text": {
    "status": "generated"
  },
  "contained": [
    {
      "resourceType": "Observation",
      "id": "fasting",
      "status": "final",
      "_status": {
        "fhir_comments": [
          "    the mandatory quality flag:    "
        ]
      },
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "49541-6",
            "display": "Fasting status - Reported"
          }
        ]
      },
      "subject": {
        "reference": "Patient/Ruth,C. Cook"
      },
      "valueCodeableConcept": {
        "coding": [
          {
            "system": "http://hl7.org/fhir/v2/0136",
            "code": "Y",
            "display": "Yes"
          }
        ]
      }
    }
  ],
  "subject": {
    "reference": "Patient/Ruth,C. Cook"
  },
  "orderer": {
    "reference": "Practitioner/John Smith"
  },
  "identifier": [
    {
      "type": {
        "coding": [
          {
            "system": "http://hl7.org/fhir/identifier-type",
            "code": "PLAC"
          }
        ],
        "text": "Placer"
      },
      "system": "urn:oid:1.3.4.5.6.7",
      "value": "2345234234234"
    }
  ],
  "encounter": {
    "reference": "Encounter/example"
  },
  "reason": [
    {
      "coding": [
        {
          "system": "xxx",
          "code": "xxx",
          "display": "xxx"
        }
      ]
    }
  ],
  "supportingInformation": [
    {
      "reference": "https://fhir-api-dstu2.smarthealthit.org/Observation/1726-lab"
    }
  ],
  "status": "requested",
  "event": [
    {
      "status": "requested",
      "dateTime": "2013-05-02T16:16:00-07:00",
      "actor": {
        "reference": "Practitioner/example"
      }
    }
  ],
  "item": [
    {
      "code": {
        "coding": [
          {
            "system": "http://acme.org/tests",
            "code": "LIPID"
          }
        ],
        "text": "Lipid Panel"
      },
      "specimen": [
        {
          "reference": "Specimen/101"
        }
      ]
    }
  ],
  "note": [
    {
      "text": "patient is afraid of needles"
    }
  ]
}

REPORT = {
  "resourceType": "DiagnosticReport",
  "id": "ultrasound",
  "text": {
    "status": "generated",
    "div": "<div><p><b>Generated Narrative with Details</b></p><p><b>id</b>: ultrasound</p><p><b>status</b>: final</p><p><b>category</b>: Radiology <span>(Details : {SNOMED CT code '394914008' = 'Radiology - specialty (qualifier value)', given as 'Radiology'}; {http://hl7.org/fhir/v2/0074 code 'RAD' = 'Radiology)</span></p><p><b>code</b>: Abdominal Ultrasound <span>(Details : {SNOMED CT code '45036003' = 'Ultrasonography of abdomen (procedure)', given as 'Ultrasonography of abdomen'})</span></p><p><b>subject</b>: <a>Patient/example</a></p><p><b>effective</b>: 2012-12-1 12:00:00</p><p><b>issued</b>: 2012-12-1 12:00:00</p><p><b>performer</b>: <a>Practitioner/example</a></p><h3>Images</h3><table><tr><td>-</td><td><b>Comment</b></td><td><b>Link</b></td></tr><tr><td>*</td><td>A comment about the image</td><td><a>WADO example image</a></td></tr></table><p><b>conclusion</b>: Unremarkable study</p></div>"
  },
  "status": "final",
  "category": {
    "fhir_comments": [
      "   No identifier or request details were available   "
    ],
    "coding": [
      {
        "fhir_comments": [
          "   The request was honored by the Department of Radiology   "
        ],
        "system": "http://snomed.info/sct",
        "code": "394914008",
        "display": "Radiology"
      },
      {
        "system": "http://hl7.org/fhir/v2/0074",
        "code": "RAD"
      }
    ]
  },
  "code": {
    "coding": [
      {
        "system": "http://snomed.info/sct",
        "code": "45036003",
        "display": "Ultrasonography of abdomen"
      }
    ],
    "text": "Abdominal Ultrasound"
  },
  "subject": {
    "reference": "Patient/example"
  },
  "effectiveDateTime": "2012-12-01T12:00:00+01:00",
  "issued": "2012-12-01T12:00:00+01:00",
  "performer": {
    "reference": "Practitioner/example"
  },
  "image": [
    {
      "comment": "A comment about the image",
      "link": {
        "reference": "Media/1.2.840.11361907579238403408700.3.0.14.19970327150033",
        "display": "WADO example image"
      }
    }
  ],
  "conclusion": "Unremarkable study"
}

INDENTIFIER = [
{
    "type": {
      "coding": [
        {
          "system": "http://hl7.org/fhir/identifier-type",
          "code": "PLAC"
        }
      ],
      "text": "Placer"
    },
    "system": "urn:oid:1.3.4.5.6.7",
    "value": "2345234234234"
  }
]

testJ = {
    'resourceType': 'DiagnosticOrder',
    'status': 'requested',    
    'reason': [
        {
            'text': '1',
        }
    ],
    'item': [
        {
            'code': {
                'coding': [
                    {
                        'code': '1',
                        'system': '1',
                        'display': '1'
                    }
                ]
            },
            'bodySite': {
                'coding': [
                    {
                        'code': '1',
                        'system': '1',
                        'display': '1'
                    }
                ]
            }
        }
    ],
    'orderer': {
      'reference': 'Practitioner/1234'
    ,
    },
    'supportingInformation': [
        {
            'reference': 'https: //fhir-api-dstu2.smarthealthit.org/Observation/1726-lab'
        }
    ],
    'identifier': [
        {
            'system': '1',
            'value': '1'
        }
    ],
    'encounter': {
        'reference': 'Patient/1272431--Encounter/238'
    },
    'subject': {
        'reference': 'Patient/765583'
    },
    "text": {
      "status": "generated",
      "div": "<div>\n\t\t\t<p>Chest CT - ordered May 8, 2013 by Dr. Adam Careful</p>\n\t\t</div>"
    },
}