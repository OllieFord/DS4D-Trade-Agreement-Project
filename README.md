## Trade-Agreement-Project

This repository contains the dataset as well as group component of the data science for design course. We are using the ToTA : Texts of Trade Agreements dataset (taken from here: [ToTA github](https://github.com/mappingtreaties/tota)) for this project.

# `ToTA`: Texts of Trade Agreements
`ToTA` is a machine-readable and annotated full text corpus of preferential trade agreements (PTAs) in XML format.

# Context

The number of trade agreements has dramatically increased since the early 1990s. Trade agreements cover ever more issues and an average agreement text is now around ten times longer than 25 years ago. This makes it more and more difficult to analyze the content of trade agreements and assess their impact on international trade and welfare. Big data and text-as-data methods can help researchers, policy-makers and other stakeholders to better manage the growing complexity of trade agreements.

# Corpus description

This corpus builds on the [WTO Regional Trade Agreements Information System](http://rtais.wto.org) data. We gather metadata and full texts from this source, correct the deficiencies (missing full texts or incorrect metadata), apply optical character recognition or other methods to arrive at machine-readable texts, remove annexes or schedules, impose two-level hierarchy of treaty elements, and, finally, produce XMLs that are stored in `xml/` folder. Please note that the texts may contain errors due to optical character recognition deficiencies.

The resulting data contains 448 PTA texts notified to the WTO, and two texts for Trans-Pacific Partnership agreement (in English and Spanish). When the PTA texts are available in more than one of the official WTO languages (English, French, Spanish) we prioritise English and report the respective XML in this language.


