import React, { useState } from 'react';
import { Store, MapPin, Phone, Mail, Clock, Camera, Save, ArrowLeft, Monitor, Plus, X, Calculator, Star } from 'lucide-react';

export default function StoreSetup() {
  const [formData, setFormData] = useState({
    template: '',
    adminEmail: '',
    businessPhone: '',
    timezone: '',
    terminals: [
      { type: '', terminalName: '', displayName: '' }
    ],
    taxEnabled: false,
    taxClasses: [
      { className: '', taxPercent: '', isDefault: true }
    ],
    serviceAreas: [
      { areaName: '', areaType: '' }
    ]
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTerminalChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      terminals: prev.terminals.map((terminal, i) => 
        i === index ? { ...terminal, [field]: value } : terminal
      )
    }));
  };

  const addTerminal = () => {
    setFormData(prev => ({
      ...prev,
      terminals: [...prev.terminals, { type: '', terminalName: '', displayName: '' }]
    }));
  };

  const removeTerminal = (index) => {
    if (formData.terminals.length > 1) {
      setFormData(prev => ({
        ...prev,
        terminals: prev.terminals.filter((_, i) => i !== index)
      }));
    }
  };

  const handleTaxClassChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      taxClasses: prev.taxClasses.map((taxClass, i) => 
        i === index ? { ...taxClass, [field]: value } : taxClass
      )
    }));
  };

  const addTaxClass = () => {
    setFormData(prev => ({
      ...prev,
      taxClasses: [...prev.taxClasses, { className: '', taxPercent: '', isDefault: false }]
    }));
  };

  const removeTaxClass = (index) => {
    if (formData.taxClasses.length > 1) {
      setFormData(prev => ({
        ...prev,
        taxClasses: prev.taxClasses.filter((_, i) => i !== index)
      }));
    }
  };

  const setDefaultTaxClass = (index) => {
    setFormData(prev => ({
      ...prev,
      taxClasses: prev.taxClasses.map((taxClass, i) => ({
        ...taxClass,
        isDefault: i === index
      }))
    }));
  };

  const handleServiceAreaChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      serviceAreas: prev.serviceAreas.map((area, i) => 
        i === index ? { ...area, [field]: value } : area
      )
    }));
  };

  const addServiceArea = () => {
    setFormData(prev => ({
      ...prev,
      serviceAreas: [...prev.serviceAreas, { areaName: '', areaType: '' }]
    }));
  };

  const removeServiceArea = (index) => {
    if (formData.serviceAreas.length > 1) {
      setFormData(prev => ({
        ...prev,
        serviceAreas: prev.serviceAreas.filter((_, i) => i !== index)
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    alert('Store details saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Store className="w-12 h-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Store Setup</h1>
          </div>
          <p className="text-gray-600 text-lg">Configure your store details and preferences</p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step <= currentStep 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`h-1 w-24 mx-2 ${
                    step < currentStep ? 'bg-indigo-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Business Info</span>
            <span>Terminals</span>
            <span>Tax & Tips</span>
            <span>Service Areas</span>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div>
              {/* Step 1: Business Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Business Information</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Template *
                    </label>
                    <select
                      name="template"
                      value={formData.template}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    >
                      <option value="">Choose a template</option>
                      <option value="qlite-fsr">QLite FSR</option>
                      <option value="fsr">FSR</option>
                      <option value="qst">QST</option>
                      <option value="qlite-retail">Qlite Retail</option>
                      <option value="retail">Retail</option>
                      <option value="qlite-qsr">Qlite QSR</option>
                      <option value="bar">Bar</option>
                      <option value="self-ordering">Self Ordering</option>
                    </select>
                    <p className="text-sm text-gray-500 mt-1">
                      This will configure default settings and features for your business type
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Admin Email *
                      </label>
                      <input
                        type="email"
                        name="adminEmail"
                        value={formData.adminEmail}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="admin@yourbusiness.com"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Primary email for administrative notifications
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Phone *
                      </label>
                      <input
                        type="tel"
                        name="businessPhone"
                        value={formData.businessPhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Main contact number for your business
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone *
                    </label>
                    <select
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select your timezone</option>
                      <optgroup label="North America">
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="America/Anchorage">Alaska Time (AKT)</option>
                        <option value="Pacific/Honolulu">Hawaii Time (HST)</option>
                      </optgroup>
                      <optgroup label="Europe">
                        <option value="Europe/London">London (GMT/BST)</option>
                        <option value="Europe/Paris">Paris (CET/CEST)</option>
                        <option value="Europe/Berlin">Berlin (CET/CEST)</option>
                        <option value="Europe/Rome">Rome (CET/CEST)</option>
                        <option value="Europe/Madrid">Madrid (CET/CEST)</option>
                      </optgroup>
                      <optgroup label="Asia Pacific">
                        <option value="Asia/Tokyo">Tokyo (JST)</option>
                        <option value="Asia/Shanghai">Shanghai (CST)</option>
                        <option value="Asia/Mumbai">Mumbai (IST)</option>
                        <option value="Australia/Sydney">Sydney (AEST/AEDT)</option>
                        <option value="Australia/Melbourne">Melbourne (AEST/AEDT)</option>
                      </optgroup>
                      <optgroup label="Other">
                        <option value="UTC">UTC (Coordinated Universal Time)</option>
                      </optgroup>
                    </select>
                    <p className="text-sm text-gray-500 mt-1">
                      This will be used for scheduling and time-based features
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Terminals */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <Monitor className="w-6 h-6 mr-2" />
                    Terminal Configuration
                  </h2>
                  
                  <div className="space-y-6">
                    {formData.terminals.map((terminal, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-6 relative">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-800">
                            Terminal {index + 1}
                          </h3>
                          {formData.terminals.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeTerminal(index)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Terminal Type *
                            </label>
                            <select
                              value={terminal.type}
                              onChange={(e) => handleTerminalChange(index, 'type', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              required
                            >
                              <option value="">Select type</option>
                              <option value="POS">POS</option>
                              <option value="Lite">Lite</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Terminal Name *
                            </label>
                            <input
                              type="text"
                              value={terminal.terminalName}
                              onChange={(e) => handleTerminalChange(index, 'terminalName', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="e.g., Terminal-01"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Display Name *
                            </label>
                            <input
                              type="text"
                              value={terminal.displayName}
                              onChange={(e) => handleTerminalChange(index, 'displayName', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="e.g., Front Counter"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={addTerminal}
                      className="flex items-center px-6 py-3 border-2 border-dashed border-indigo-300 text-indigo-600 rounded-lg hover:border-indigo-400 hover:text-indigo-700 transition-colors"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add Terminal
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Tax & Tips */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <Calculator className="w-6 h-6 mr-2" />
                    Account Tip and Tax Configuration
                  </h2>
                  
                  {/* Tax Class Enable/Disable */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">Enable Tax Classes</h3>
                        <p className="text-sm text-gray-600">Configure tax rates for your business</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="taxEnabled"
                            checked={formData.taxEnabled === true}
                            onChange={() => setFormData(prev => ({ ...prev, taxEnabled: true }))}
                            className="mr-2"
                          />
                          <span className="text-sm font-medium text-gray-700">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="taxEnabled"
                            checked={formData.taxEnabled === false}
                            onChange={() => setFormData(prev => ({ ...prev, taxEnabled: false }))}
                            className="mr-2"
                          />
                          <span className="text-sm font-medium text-gray-700">No</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Tax Classes Configuration */}
                  {formData.taxEnabled && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-gray-800">Tax Classes</h3>
                      
                      <div className="space-y-4">
                        {formData.taxClasses.map((taxClass, index) => (
                          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 relative">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <h4 className="text-md font-medium text-gray-800 mr-3">
                                  Tax Class {index + 1}
                                </h4>
                                {taxClass.isDefault && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    <Star className="w-3 h-3 mr-1" />
                                    Default
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                {!taxClass.isDefault && (
                                  <button
                                    type="button"
                                    onClick={() => setDefaultTaxClass(index)}
                                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                                  >
                                    Set as Default
                                  </button>
                                )}
                                {formData.taxClasses.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeTaxClass(index)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                  >
                                    <X className="w-5 h-5" />
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Class Name *
                                </label>
                                <input
                                  type="text"
                                  value={taxClass.className}
                                  onChange={(e) => handleTaxClassChange(index, 'className', e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                  placeholder="e.g., Sales Tax, VAT, GST"
                                  required
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Tax Percent *
                                </label>
                                <div className="relative">
                                  <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="100"
                                    value={taxClass.taxPercent}
                                    onChange={(e) => handleTaxClassChange(index, 'taxPercent', e.target.value)}
                                    className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="0.00"
                                    required
                                  />
                                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={addTaxClass}
                          className="flex items-center px-6 py-3 border-2 border-dashed border-indigo-300 text-indigo-600 rounded-lg hover:border-indigo-400 hover:text-indigo-700 transition-colors"
                        >
                          <Plus className="w-5 h-5 mr-2" />
                          Add Tax Class
                        </button>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-800 mb-2">Tax Configuration Notes</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• One tax class must be set as default for new items</li>
                          <li>• Tax percentages can include decimal places (e.g., 8.25%)</li>
                          <li>• You can have multiple tax classes for different product categories</li>
                          <li>• Tax classes can be assigned to individual products later</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {!formData.taxEnabled && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                      <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2">Tax Classes Disabled</h3>
                      <p className="text-gray-500">Enable tax classes above to configure tax rates for your business.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Service Areas */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <MapPin className="w-6 h-6 mr-2" />
                    Service Areas
                  </h2>
                  
                  <div className="space-y-6">
                    {formData.serviceAreas.map((area, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-6 relative">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-800">
                            Service Area {index + 1}
                          </h3>
                          {formData.serviceAreas.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeServiceArea(index)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Service Area Name *
                            </label>
                            <input
                              type="text"
                              value={area.areaName}
                              onChange={(e) => handleServiceAreaChange(index, 'areaName', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="e.g., Main Floor, Patio, Drive Thru"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Service Area Type *
                            </label>
                            <select
                              value={area.areaType}
                              onChange={(e) => handleServiceAreaChange(index, 'areaType', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              required
                            >
                              <option value="">Select type</option>
                              <option value="Quick Serve">Quick Serve</option>
                              <option value="Main dining">Main dining</option>
                              <option value="Delivery">Delivery</option>
                              <option value="Bar Tab">Bar Tab</option>
                              <option value="Takeout">Takeout</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={addServiceArea}
                      className="flex items-center px-6 py-3 border-2 border-dashed border-indigo-300 text-indigo-600 rounded-lg hover:border-indigo-400 hover:text-indigo-700 transition-colors"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add Service Area
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>

                {currentStep === totalSteps ? (
                  <button
                    onClick={handleSubmit}
                    className="flex items-center px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Store Details
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Next
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
