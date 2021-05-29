class Condition
  def initialize(name, symptoms = [])
    @name = name
    @symptoms = symptoms
  end

  def name
    return @name
  end

  def symptoms
    return @symptoms
  end

  def add_symptom(symptom)
    @symptoms.push(symptom)
  end

  def remove_symptom(symptom)
    @symptoms.delete(symptom)
  end
end