
import requests
import xml.etree.ElementTree as ET
import pandas as pd

user_agent_url = 'http://www.user-agents.org/allagents.xml'
xml_data = requests.get(user_agent_url).content

class XML2DataFrame:

    def __init__(self, xml_data):
        self.root = ET.XML(xml_data)

    def parse_root(self, root):
        return [self.parse_element(child) for child in iter(root)]

    def parse_element(self, element, parsed=None):
        if parsed is None:
            parsed = dict()

        for key in element.keys():
            if key not in parsed:
                parsed[key] = element.attrib.get(key)
            else:
                raise ValueError('duplicate attribute {0} at element {1}'.format(key, element.getroottree().getpath(element))

        for child in list(element):
            self.parse_element(child, parsed)

        return parsed

    def process_data(self):
        structure_data = self.parse_root(self.root)
        return pd.DataFrame(structure_data)

xml2df = XML2DataFrame(xml_data)
xml_dataframe = xml2df.process_data()
print(xml_dataframe)
print(xml2df)