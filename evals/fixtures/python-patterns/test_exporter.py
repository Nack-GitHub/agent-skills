from exporter import export

ROWS = [{"id": 1, "name": "a"}, {"id": 2, "name": "b"}]


def test_csv():
    assert export(ROWS, "csv").splitlines()[0] == "id,name"


def test_json():
    assert export(ROWS, "json").startswith("[")
