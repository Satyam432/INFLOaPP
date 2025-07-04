import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Alert,
  TouchableOpacity 
} from 'react-native';
import { Button, InputField, Card } from '../../components';
import { useAuthStore } from '../../state';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants';
import { validateRequired, validateNumber, validateMinLength } from '../../utils/validators';

export default function BrandCreateCampaignScreen({ navigation }) {
  const { user } = useAuthStore();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    targetAudience: '',
    campaignType: '',
    deadline: '',
    requirements: ''
  });
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedType, setSelectedType] = useState('');

  // Campaign type options
  const campaignTypes = [
    { id: 'product_launch', name: 'Product Launch', icon: 'rocket-outline' },
    { id: 'brand_awareness', name: 'Brand Awareness', icon: 'megaphone-outline' },
    { id: 'content_creation', name: 'Content Creation', icon: 'camera-outline' },
    { id: 'event_promotion', name: 'Event Promotion', icon: 'calendar-outline' }
  ];

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Title validation
    const titleError = validateRequired(formData.title, 'Campaign title') || 
                      validateMinLength(formData.title, 3, 'Campaign title');
    if (titleError) newErrors.title = titleError;

    // Description validation
    const descError = validateRequired(formData.description, 'Description') ||
                     validateMinLength(formData.description, 10, 'Description');
    if (descError) newErrors.description = descError;

    // Budget validation
    const budgetError = validateRequired(formData.budget, 'Budget') ||
                       validateNumber(formData.budget, 'Budget');
    if (budgetError) newErrors.budget = budgetError;
    else if (parseFloat(formData.budget) < 100) {
      newErrors.budget = 'Budget must be at least $100';
    }

    // Campaign type validation
    if (!selectedType) {
      newErrors.campaignType = 'Please select a campaign type';
    }

    // Target audience validation
    const audienceError = validateRequired(formData.targetAudience, 'Target audience');
    if (audienceError) newErrors.targetAudience = audienceError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fill in all required fields correctly.');
      return;
    }

    setIsLoading(true);

    // Prepare campaign data
    const campaignData = {
      ...formData,
      campaignType: selectedType,
      budget: parseFloat(formData.budget),
      brandId: user?.userId,
      brandName: user?.name || 'Your Brand',
      status: 'draft',
      createdAt: new Date().toISOString(),
      id: `cmp_${Date.now()}`
    };

    // Console log the campaign data
    console.log('🚀 Creating New Campaign:');
    console.log('=========================');
    console.log('Campaign ID:', campaignData.id);
    console.log('Title:', campaignData.title);
    console.log('Description:', campaignData.description);
    console.log('Budget: $', campaignData.budget.toLocaleString());
    console.log('Campaign Type:', campaignData.campaignType);
    console.log('Target Audience:', campaignData.targetAudience);
    console.log('Requirements:', campaignData.requirements || 'None specified');
    console.log('Deadline:', campaignData.deadline || 'Not specified');
    console.log('Brand:', campaignData.brandName);
    console.log('Created At:', campaignData.createdAt);
    console.log('=========================');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      Alert.alert(
        'Campaign Created!',
        `"${campaignData.title}" has been created successfully. Check the console for details.`,
        [
          {
            text: 'View Campaigns',
            onPress: () => navigation.navigate('Campaigns')
          },
          {
            text: 'Create Another',
            onPress: () => {
              // Reset form
              setFormData({
                title: '',
                description: '',
                budget: '',
                targetAudience: '',
                campaignType: '',
                deadline: '',
                requirements: ''
              });
              setSelectedType('');
              setErrors({});
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error creating campaign:', error);
      Alert.alert('Error', 'Failed to create campaign. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderCampaignTypeSelector = () => (
    <View className="mb-6">
      <Text className="text-sm font-medium text-gray-700 mb-3">Campaign Type *</Text>
      <View className="flex-row flex-wrap gap-3">
        {campaignTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            onPress={() => {
              setSelectedType(type.id);
              updateFormData('campaignType', type.id);
            }}
            className={`flex-1 min-w-[45%] p-4 rounded-lg border-2 ${
              selectedType === type.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <View className="items-center">
              <Ionicons 
                name={type.icon} 
                size={24} 
                color={selectedType === type.id ? Colors.primary : Colors.gray500} 
              />
              <Text className={`text-sm font-medium mt-2 text-center ${
                selectedType === type.id ? 'text-primary' : 'text-gray-700'
              }`}>
                {type.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {errors.campaignType && (
        <Text className="text-sm text-red-500 mt-1">{errors.campaignType}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView 
        className="flex-1" 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          className="flex-1" 
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="bg-white px-6 py-4 border-b border-gray-200">
            <Text className="text-2xl font-bold text-gray-900">Create Campaign</Text>
            <Text className="text-gray-600 mt-1">
              Launch your next collaboration campaign
            </Text>
          </View>

          <View className="px-6 py-6">
            {/* Basic Information Section */}
            <Card style={{ marginBottom: 24 }} padding="large">
              <View className="flex-row items-center mb-4">
                <Ionicons name="information-circle-outline" size={20} color={Colors.primary} />
                <Text className="text-lg font-semibold text-gray-900 ml-2">
                  Basic Information
                </Text>
              </View>

              <InputField
                label="Campaign Title *"
                placeholder="e.g., Spring Collection Launch 2024"
                value={formData.title}
                onChangeText={(value) => updateFormData('title', value)}
                error={errors.title}
                leftIcon="megaphone-outline"
              />

              <InputField
                label="Description *"
                placeholder="Describe your campaign goals, target outcomes, and key messages..."
                value={formData.description}
                onChangeText={(value) => updateFormData('description', value)}
                error={errors.description}
                multiline
                numberOfLines={4}
                leftIcon="document-text-outline"
              />

              <InputField
                label="Budget (USD) *"
                placeholder="Enter total campaign budget"
                value={formData.budget}
                onChangeText={(value) => updateFormData('budget', value)}
                error={errors.budget}
                keyboardType="numeric"
                leftIcon="cash-outline"
              />
            </Card>

            {/* Campaign Type Section */}
            <Card style={{ marginBottom: 24 }} padding="large">
              <View className="flex-row items-center mb-4">
                <Ionicons name="grid-outline" size={20} color={Colors.primary} />
                <Text className="text-lg font-semibold text-gray-900 ml-2">
                  Campaign Type
                </Text>
              </View>
              {renderCampaignTypeSelector()}
            </Card>

            {/* Target Audience Section */}
            <Card style={{ marginBottom: 24 }} padding="large">
              <View className="flex-row items-center mb-4">
                <Ionicons name="people-outline" size={20} color={Colors.primary} />
                <Text className="text-lg font-semibold text-gray-900 ml-2">
                  Target Audience
                </Text>
              </View>

              <InputField
                label="Target Audience *"
                placeholder="e.g., Women aged 18-35 interested in sustainable fashion"
                value={formData.targetAudience}
                onChangeText={(value) => updateFormData('targetAudience', value)}
                error={errors.targetAudience}
                multiline
                numberOfLines={3}
                leftIcon="people-outline"
              />
            </Card>

            {/* Additional Details Section */}
            <Card style={{ marginBottom: 24 }} padding="large">
              <View className="flex-row items-center mb-4">
                <Ionicons name="settings-outline" size={20} color={Colors.primary} />
                <Text className="text-lg font-semibold text-gray-900 ml-2">
                  Additional Details
                </Text>
              </View>

              <InputField
                label="Campaign Deadline"
                placeholder="e.g., March 15, 2024"
                value={formData.deadline}
                onChangeText={(value) => updateFormData('deadline', value)}
                leftIcon="calendar-outline"
              />

              <InputField
                label="Content Requirements"
                placeholder="Specify deliverables: posts, videos, stories, etc."
                value={formData.requirements}
                onChangeText={(value) => updateFormData('requirements', value)}
                multiline
                numberOfLines={3}
                leftIcon="list-outline"
              />
            </Card>

            {/* Submit Button */}
            <Button
              title="Create Campaign"
              onPress={handleSubmit}
              loading={isLoading}
              disabled={isLoading}
              size="large"
              variant="primary"
              style={{ marginTop: 10 }}
            />

            {/* Info Box */}
            <Card variant="info" style={{ marginTop: 16 }}>
              <View className="flex-row">
                <Ionicons name="information-circle" size={20} color={Colors.info} />
                <View className="flex-1 ml-3">
                  <Text className="text-sm font-medium text-blue-800">Campaign Preview</Text>
                  <Text className="text-sm text-blue-600 mt-1">
                    Your campaign will be saved as a draft. You can publish it later to make it visible to creators.
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 